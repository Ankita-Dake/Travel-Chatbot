FROM python

WORKDIR /myapp

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .


CMD [ "python main.py" ]