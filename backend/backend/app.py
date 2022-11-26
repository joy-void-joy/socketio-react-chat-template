from asgiref.wsgi import WsgiToAsgi
import socketio

from environs import Env
from . import chat

env = Env()
env.read_env(".env.default")
env.read_env()

sio = socketio.AsyncServer(
    cors_allowed_origins=[
        f"http://localhost:{env.str('BACKEND_PORT')}",
        f"http://localhost:{env.str('FRONTEND_PORT')}",
    ],
    async_mode="asgi",
)


@sio.event
async def ask_message(sid: str, params: str):
    await sio.emit("answer_message", chat.to_message(params, sid))


asgi = socketio.ASGIApp(sio)
