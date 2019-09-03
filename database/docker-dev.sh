docker rm -f database &>/dev/null && echo 'database container removed'
docker run --rm --name database -e POSTGRES_DB=app_db -e POSTGRES_PASSWORD=app_db_pw -e POSTGRES_USER=app_db_user -d -p '5432:5432' example/postgresql:9.5
for i in {1..10}; do
    docker logs database 2>&1  | grep -Pzl '(?s)init process complete.*\n.*ready to accept connections'
    if [ $? -eq 0 ]; then
    	echo "Postgres container is now running."
        break
    fi
    if [ $i -eq 10 ]; then
        echo "Postgres container did not start successfully."
        exit 1
    fi
    sleep 2
done
