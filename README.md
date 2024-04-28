## 프로젝트 개요
이 프로젝트는 티케팅 서비스에서 구매가 완료 된 시점에 rabbitMQ에 유저와 티켓 그리고 가격에 대한 정보가 담긴 메시지를 수신하여 해당 유저에게 이메일 발송을 목표로 합니다. 

- NestJS
- Postgresql
- TypeORM

## 주요 기능 및 구현 내용

### RabbitMQ 설정 및 메시지 수신
- RabbitMQ와 통신이 가능하도록 설정
- 결제에 관한 message queue를 수신하고 있다가 티켓팅 서버로부터 메시지가 들어오면 결제 및 이메일 발송 로직 처리

### 간단한 결제 과정 
- 실제 결제를 구현하지 않고 간단하게 10~30초 random time bufferr가 발생 후 이메일 발송 로직 실행

### 이메일 발송 
- nodemailer 라이브러리를 사용하여 이메일 발송 로직 구현
- gmail account로 이메일을 보내기 위한 gmail smtp 설정
- message에 담긴 유저와 티켓 정보를 기반으로 DB에서 해당 유저와 티켓을 조회
- html형식의 메일 템플릿을 만들고 각 유저와 티켓 그리고 메시지에 담긴 가격 정보를 변수로 넣은 후 이메일 발송  


## 사용 기술 스택
- 프레임워크: NestJS
- 데이터베이스: PostgreSQL
- ORM: TypeORM
- 컨테이너 관리: Docker, Docker Compose
- 비동기 메시징: RabbitMQ
- 메일 발송: nodemailer, Gmail smtp

## QuickStart
### 개발 환경 설정
1. Docker 및 Docker Compose 설치
2. 소스코드 클론
3. 환경변수 설정
4. docker-compose buil
5. docker-compose up












