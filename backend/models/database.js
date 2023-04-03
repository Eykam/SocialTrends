require("dotenv").config();
const { getFromRedis, setToRedis } = require("./redisDriver");
const postgres = require("postgres");

const sql = postgres(
  `postgres://${process.env.RDS_USER}:${process.env.RDS_PASS}@${process.env.RDS_HOST}:${process.env.RDS_PORT}/${process.env.RDS_DB}`
);

async function engagingUsers() {
  const users = await sql`
        with updatedUsers as (select id, uniqueId, followercount, followingcount, heartcount, videocount, round(((heartcount::decimal / NULLIF(videocount,0))/ NULLIF(followercount,0)), 5) as engagementRatio
                            from users)

        select id, uniqueId, followercount, followingcount, heartcount, videocount, engagementRatio
        from updatedUsers
        where engagementRatio > (select avg(engagementRatio) from updatedUsers)
        order by engagementRatio desc
        limit 100
    `;

  return users;
}

async function popularPosts() {
  const popularPosts = await sql`
        with temp as (select * from posts
          order by playcount desc
          limit 200)
          select * from (select distinct on (id) id as "Post ID", authoruniqueid as Username, 
                          description as Description, duration/1000 as "Length (seconds)", 
                          (musicauthorname||': '||musictitle) as song, TO_CHAR(playcount, 'FM9,999,999,999') as plays, 
                          TO_CHAR(commentcount, 'FM9,999,999,999') as Comments, 
                          TO_CHAR(diggcount, 'FM9,999,999,999') as Diggs, 
                          TO_CHAR(sharecount, 'FM9,999,999,999') as Shares, 
                          hashtagList as Hashtags,createtime as "Created At"
                          from temp
                          order by id) temp2
          order by Plays desc
          limit 100
  `;

  return popularPosts;
}

async function totalUniqueUsers() {
  const userCount = await sql`
        select count(*) from users
    `;

  return userCount[0]["count"];
}

async function totalUniquePosts() {
  const postCount = await sql`
        select count(*) from posts
    `;

  return postCount[0]["count"];
}

async function avgNewPosts() {
  const avgNewPosts = await sql`
    select *
    from (SELECT count(*) as newposts FROM posts WHERE dateextracted::DATE > CURRENT_DATE - 1) temp1,
        (SELECT count(*)/7 as avgnewposts FROM posts WHERE dateextracted::DATE > CURRENT_DATE - 7) temp2
  `;

  return avgNewPosts[0];
}

async function avgNewUsers() {
  const avgNewUsers = await sql`
    select *
    from (SELECT count(*) as newusers FROM users WHERE dateextracted::DATE > CURRENT_DATE - 1) temp1,
    (SELECT count(*)/7 as avgnewusers FROM users WHERE dateextracted::DATE > CURRENT_DATE - 7) temp2
  `;

  return avgNewUsers[0];
}

async function commonHashtags() {
  const common = await sql`
      with temp as (select token, count(token) as tokenCount
                    from posts, unnest(string_to_array(translate(hashtagList, '[]', ''), ',')) token
                    GROUP BY token
                    order by tokenCount DESC)
      Select token as id, tokenCount/sum as value 
      from temp, (select sum(tokenCount) as sum from temp) total
      limit 6`;

  return common;
}

async function avgVideoLengths() {
  const avgVidLength = await sql`
        select avg(duration)::INT from posts
    `;

  return avgVidLength[0];
}

async function avgDescriptionLength() {
  const avgDescLength = await sql`
        select avg(length(description))::INT from posts
    `;

  return avgDescLength[0];
}

async function postTimes() {
  const postTimes = await sql`
        with temp as (select MOD((date_part('hour',createtime)+20)::INTEGER, 24) as id, count(*) as value from posts
                  group by date_part('hour', createtime) 
                  order by id)
        select id, round((value/sum), 3) as value
        from temp, (select sum(value) as sum from temp) temp2
  `;

  return postTimes;
}

async function geoData() {
  const geoData = await sql`
        select region as id, sum(heartcount) as value from users
        where region != ''
        group by region
  `;

  return geoData;
}
module.exports = {
  engagingUsers,
  popularPosts,
  totalUniquePosts,
  totalUniqueUsers,
  avgNewPosts,
  avgNewUsers,
  commonHashtags,
  avgVideoLengths,
  avgDescriptionLength,
  postTimes,
  geoData,
};
