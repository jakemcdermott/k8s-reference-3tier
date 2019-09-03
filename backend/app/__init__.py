import os
import sys

def find_commands(management_dir):
    # Modified version of function from django/core/management/__init__.py.
    command_dir = os.path.join(management_dir, 'commands')
    commands = []
    try:
        for f in os.listdir(command_dir):
            if f.startswith('_'):
                continue
            elif f.endswith('.py') and f[:-3] not in commands:
                commands.append(f[:-3])
            elif f.endswith('.pyc') and f[:-4] not in commands: # pragma: no cover
                commands.append(f[:-4])
    except OSError:
        pass
    return commands

def prepare_env():
    import django.core.management
    django.core.management.find_commands = find_commands

def manage():
    prepare_env()
    from django.conf import settings
    from django.core.management import execute_from_command_line
    settings.configure()
    execute_from_command_line(sys.argv)
