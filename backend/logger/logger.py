import os
import sys
import logging
from logging.handlers import RotatingFileHandler
from pythonjsonlogger import jsonlogger
from dotenv import load_dotenv

# --- Setup Logging ---
load_dotenv()
ENV=os.getenv("ENV")
logger = logging.getLogger("agent_logger")
logger.setLevel(logging.DEBUG if ENV=="dev" else logging.INFO)
logger.propagate =False

console_handler = logging.StreamHandler(sys.stdout)
console_handler.setLevel(logging.DEBUG if ENV=="dev" else logging.INFO)
console_formatter = logging.Formatter(
    "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
log_format = (
    "%(asctime)s %(levelname)s %(name)s %(module)s "
    "%(funcName)s %(lineno)d %(message)s"
)
json_formatter = jsonlogger.JsonFormatter(log_format)

console_handler.setFormatter(console_formatter)
os.makedirs("logs", exist_ok=True)
file_handler = RotatingFileHandler("logs/agent.log", maxBytes=1_000_000, backupCount=5)
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(json_formatter)

if not logger.handlers:
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)