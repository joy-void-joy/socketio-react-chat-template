import click
from environs import Env
from hypercorn.__main__ import main as hypercorn_main

env = Env()
env.read_env(".env.default")
env.read_env()


@click.command()
def main():
    hypercorn_main(
        [
            "backend.app:asgi",
            "--bind",
            f"localhost:{env.str('BACKEND_PORT')}",
            "--reload",
            "--debug",
        ]
    )


if __name__ == "__main__":
    main()
