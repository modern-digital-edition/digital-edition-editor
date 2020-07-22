import click

from jinja2 import Environment, PackageLoader


@click.command()
@click.option('-d', '--debug', is_flag=True, default=False)
@click.option('--sqlalchemy-url', default='sqlite:///%(here)s/toja.sqlite')
@click.pass_context
def create_config(ctx, debug, sqlalchemy_url):
    """Create a new configuration file."""
    env = Environment(loader=PackageLoader('digi_edit', 'scripts'))
    tmpl = env.get_template(name='config.jinja2')
    with open(ctx.parent.params['config'], 'w') as out_f:
        out_f.write(tmpl.render(debug=debug,
                                sqlalchemy_url=sqlalchemy_url))
