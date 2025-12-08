FROM python:3.12.10-alpine
#has python 3.12.10 and alpine linux
WORKDIR /app
#inside the container, set the working directory to /app

COPY . .

RUN pip install -r requirements.txt

#RUN export NAME=hothaifa 
#specific shell session

#ENV YEAR=1900
#available to all processes runnin
#name = os.environ.get("NAME")

EXPOSE 5001
#app.run(port=5001,host='0.0.0.0')

CMD [ "python","main.py" ]

#command to build the docker image
#docker build -t app_test .
