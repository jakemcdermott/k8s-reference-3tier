```shell
cd database

docker build -t example/postgresql:9.5 .
docker push example/postgresql:9.5

kubectl create -f k8s-persistent-volume-claim.yml
kubectl create -f k8s-deployment.yml
kubectl create -f k8s-service.yml
```
