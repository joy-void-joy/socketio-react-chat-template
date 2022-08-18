import dataclasses
from dataclasses import dataclass
from datetime import datetime
from uuid import uuid4


@dataclass
class Message:
    id: str
    message: str
    sender: str
    dateSent: str


def to_message(text: str, sender_id: str):
    return dataclasses.asdict(
        Message(
            id=uuid4().hex,
            dateSent=str(datetime.now()),
            sender=sender_id,
            message=text,
        )
    )
