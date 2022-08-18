import pathlib
import click
from environs import Env
from aiohttp_devtools import cli as cli_aiohttp

env = Env()
env.read_env(".env.default")
env.read_env()


@click.command()
@click.pass_context
def main(ctx: click.Context):
    try:
        ctx.invoke(
            cli_aiohttp.runserver,
            app_path=pathlib.Path(__file__).parent.name,
            main_port=env.int("BACKEND_PORT"),
        )
    except KeyboardInterrupt:
        return


if __name__ == "__main__":
    main()
