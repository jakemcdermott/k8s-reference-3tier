"""
For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

from .settings import *

# SECURITY WARNING: don't run with debug turned on in production
DEBUG = True 

# Registration
ACCOUNT_EMAIL_VERIFICATION = 'optional'
# SECURITY WARNING: don't use AlwaysRootBackend in production
# AUTHENTICATION_BACKENDS = ['app.auth.AlwaysRootBackend']

# Email
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_HOST = ''
EMAIL_USE_TLS = False
EMAIL_PORT = None
EMAIL_HOST_USER = None
EMAIL_HOST_PASSWORD = None
