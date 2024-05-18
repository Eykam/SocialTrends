// require("dotenv").config();
// const { getFromRedis, setToRedis } = require("./redisDriver");
// const postgres = require("postgres");

// const sql = postgres(
//   `postgres://${process.env.RDS_USER}:${process.env.RDS_PASS}@${process.env.RDS_HOST}:${process.env.RDS_PORT}/${process.env.RDS_DB}`
// );

// async function engagingUsers() {
//   const users = await sql`
//         with updatedUsers as (select id, uniqueId, followercount, followingcount, heartcount, videocount, round(((heartcount::decimal / NULLIF(videocount,0))/ NULLIF(followercount,0)), 5) as engagementRatio
//                             from users)

//         select id, uniqueId, followercount, followingcount, heartcount, videocount, engagementRatio
//         from updatedUsers
//         where engagementRatio > (select avg(engagementRatio) from updatedUsers)
//         order by engagementRatio desc
//         limit 1000
//     `;

//   return users;
// }

// async function postsByDay() {
//   const postsByDay = await sql`
//       SELECT date_trunc('day', dateextracted) AS truncated_day, COUNT(*)
//       FROM posts
//       GROUP BY date_trunc('day', dateextracted)
//       ORDER BY truncated_day
//     `;

//   return postsByDay;
// }

// async function usersByDay() {
//   const usersByDay = await sql`
//       SELECT date_trunc('day', dateextracted::timestamp) AS truncated_day, COUNT(*)
//       FROM users
//       WHERE dateextracted IS NOT NULL
//       GROUP BY date_trunc('day', dateextracted::timestamp)
//       ORDER BY truncated_day;
//   `;

//   return usersByDay;
// }

// async function popularPosts() {
//   const popularPosts = await sql`
//         with temp as (select * from posts
//           order by playcount desc
//           limit 1000)
//           select * from (select distinct on (id) id as "Post ID", authoruniqueid as Username,
//                           description as Description, duration/1000 as "Length (seconds)",
//                           (musicauthorname||': '||musictitle) as song, TO_CHAR(playcount, 'FM9,999,999,999') as plays,
//                           TO_CHAR(commentcount, 'FM9,999,999,999') as Comments,
//                           TO_CHAR(diggcount, 'FM9,999,999,999') as Diggs,
//                           TO_CHAR(sharecount, 'FM9,999,999,999') as Shares,
//                           hashtagList as Hashtags,createtime as "Created At"
//                           from temp
//                           order by id) temp2
//           order by Plays desc
//           limit 1000
//   `;

//   return popularPosts;
// }

// async function totalUniqueUsers() {
//   const userCount = await sql`
//         select count(*) from users
//     `;

//   return userCount[0]["count"];
// }

// async function totalUniquePosts() {
//   const postCount = await sql`
//         select count(*) from posts
//     `;

//   return postCount[0]["count"];
// }

// async function avgPostsPerHour() {
//   const avgNewPosts = await sql`
//       WITH HourlyCounts AS (
//         SELECT date_trunc('hour', dateextracted) AS truncated_hour, COUNT(*) AS count
//         FROM posts
//         WHERE dateextracted IS NOT NULL
//         GROUP BY date_trunc('hour', dateextracted)
//       )
//       SELECT AVG(count::float) AS average_count
//       FROM HourlyCounts;
//   `;

//   return avgNewPosts[0];
// }

// async function avgUsersPerHour() {
//   const avgNewUsers = await sql`
//       WITH HourlyCounts AS (
//         SELECT date_trunc('hour', dateextracted::timestamp) AS hour, COUNT(*) AS count
//         FROM users
//         WHERE dateextracted IS NOT NULL
//         GROUP BY date_trunc('hour', dateextracted::timestamp)
//       )
//       SELECT AVG(count::float) AS average_count
//       FROM HourlyCounts;
//   `;

//   return avgNewUsers[0];
// }

// async function commonHashtags() {
//   const common = await sql`
//       WITH normalized_tokens AS (
//         SELECT
//           id,
//           playcount,
//           CASE
//             WHEN token LIKE '%fyp%' OR token LIKE '%foryou%' OR token LIKE '%fy%' THEN 'fyp'
//             ELSE token
//           END AS normalized_token
//         FROM
//           posts,
//           unnest(string_to_array(translate(hashtagList, '[]', ''), ',')) token
//       ),
//       temp AS (
//         SELECT
//           normalized_token AS token,
//           COUNT(normalized_token) AS tokenCount,
//           SUM(playcount) AS totalPlaycount -- Summing playcount for each normalized token
//         FROM
//           normalized_tokens
//         GROUP BY
//           normalized_token
//         ORDER BY
//           tokenCount DESC
//       ),
//       total AS (
//         SELECT
//           SUM(tokenCount) AS sum
//         FROM
//           temp
//       )
//       SELECT
//         token AS id,
//         (tokenCount::FLOAT / total.sum) AS percentage, -- Changed "value" to "percentage"
//         totalPlaycount -- Including the aggregated playcount for each token
//       FROM
//         temp,
//         total
//       LIMIT 20;
//   `;

//   return common;
// }

// async function avgVideoLengths() {
//   const avgVidLength = await sql`
//         select avg(duration)::INT from posts
//     `;

//   return avgVidLength[0];
// }

// async function avgDescriptionLength() {
//   const avgDescLength = await sql`
//         select avg(length(description))::INT from posts
//     `;

//   return avgDescLength[0];
// }

// async function postTimes() {
//   const postTimes = await sql`
//         with temp as (select MOD((date_part('hour',createtime)+20)::INTEGER, 24) as id, count(*) as value from posts
//                   group by date_part('hour', createtime)
//                   order by id)
//         select id, round((value/sum), 3) as value
//         from temp, (select sum(value) as sum from temp) temp2
//   `;

//   return postTimes;
// }

// async function geoData() {
//   const geoData = await sql`
//         select region as id, sum(heartcount) as value from users
//         where region != ''
//         group by region
//   `;

//   return geoData;
// }
// module.exports = {
//   engagingUsers,
//   popularPosts,
//   totalUniquePosts,
//   totalUniqueUsers,
//   avgPostsPerHour,
//   avgUsersPerHour,
//   postsByDay,
//   usersByDay,
//   commonHashtags,
//   avgVideoLengths,
//   avgDescriptionLength,
//   postTimes,
//   geoData,
// };
