FROM redis:latest


COPY ./data ./data
COPY ./redis.conf ./redis.conf


EXPOSE 6379

CMD ["redis-server"]
