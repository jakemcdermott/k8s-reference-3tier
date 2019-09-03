from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^api/', include('app.api.urls')),
    url(r'^auth/', include('rest_auth.urls')),
    url(r'^auth/confirm-email/', TemplateView.as_view(), name='account_email_verification_sent'),
    url(r'^registration/', include('rest_auth.registration.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^$', TemplateView.as_view(template_name="index.html"), name='index'),
]
