import asyncio
from websockets.server import serve
import json
from objectDetection import Detector

async def getData(websocket):
    detector = Detector()
    while True:
        data =  detector.runCV()
        await asyncio.sleep(0.5)
        print("items visible", data)
        await websocket.send(json.dumps(data))


async def main():
    async with serve(getData, "localhost", 8777):
        await asyncio.Future()
        
asyncio.run(main())