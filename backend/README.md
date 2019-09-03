```shell
cd backend

docker build -t example/app:latest .
docker push example/app:latest

kubectl create -f k8s-deployment.yml
APP_POD_NAME=$(kubectl get pod | grep app | awk '{ print $1 }')
kubectl exec $APP_POD_NAME -- python /app/manage.py makemigrations api --noinput
kubectl exec $APP_POD_NAME -- python /app/manage.py migrate

kubectl scale deployment/app --replicas=3
kubectl create -f k8s-service.yml
```
