FROM redis:latest


COPY ./data ./data

WORKDIR /data


EXPOSE 6379

CMD ["redis-server", "--dir", "/data", "--save", "30", "1", "--save", "10", "10", "--bind", "::"]
