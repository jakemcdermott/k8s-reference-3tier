from django.contrib.sites.models import Site
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('--name', '-n', nargs=1, type=str)
        parser.add_argument('--domain', '-d', nargs=1, type=str)

    def handle(self, *args, **options):
        domain = options['domain'].pop()
        name = options['name'].pop()

        site = Site.objects.all()[0]
        site.domain = domain
        site.name = name

        site.save()
