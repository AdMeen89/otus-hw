FROM python:3.12-slim

WORKDIR /app

COPY services/dialogs/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY services/dialogs/src /app/src
COPY services/dialogs/pyproject.toml /app/pyproject.toml
COPY services/dialogs/README.md /app/README.md
COPY services/dialogs/migrations /app/migrations

ENV PYTHONPATH=/app/src

EXPOSE 8081

# Run migrations and start app
CMD ["sh", "-c", "cd /app && echo '[DEFAULT]\nsources = migrations' > yoyo_temp.ini && yoyo apply --database postgresql://postgres:otus_hw@citus-coordinator:5432/postgres --config yoyo_temp.ini && uvicorn dialogs_app.app:app --host 0.0.0.0 --port 8081"]


