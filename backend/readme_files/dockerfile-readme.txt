Readme for dockerfile:

Dockerfile

1. מערכת הפעלה - FROM
2. הגדרת תיקיית שורש - WORKDIR
3.העתקת קבצי פרוייקט לתיקיית השורש - COPY
4. העתקת הקצבים מהאינטרנט מעל הHOST כדי לא לזבל אותו - ADD
5. הרצת פקודה של טרמינל - RUN
6. הגדרת משתני סביבה באפליקציה - ENV
7. שומר פורט פנימי בכל קונטיינר שנפתח - EXPOSE
8. באיזה יוזר להתחבר לקונטיינר - USER
9. הפקודה האחרונה שהקונטיינר ירוץ לאחר ההקמה שלו CMD
10. כמו 9 רק שלא ניתן לדריסה - ENTRYPOINT

*לפני הרצה צריך להפעיל את הdocker engine

Commands:
בונה תמונה
docker build -t app_test .
הרצת הקונטיינר בשם app_test ומעבר לטרמינל הפנימי שלו לתיקיית השורש בשפת shell בתור root USERS
docker run --name app_test -it -u root app_test sh



הסבר:
מריץ תמונה בשם הזה בגירסה הזו - run flask-app:V1
נותן של לקונטיינר - name--
נכנס לטרמינל שלו ב"של" - it sh-
רץ בתוך מנהל מערכת -u root - #
 רץ בתוך משתמש - דרוש לבדוק איך עושים את זה - user - (no matching entries in passwd file)
 מטמיע משתנה סביבה בשם פרוד - e ENV PRD-
 יחפש מי הפורט הפנוי ויעשה מיפוי פורטים לפי מה שהוא רוצה - P-
 ממפה ידני מהמארח לקונטיינר - p host:containe-
 
 צפייה בפרטי הקונטיינר - docker inspect docker_name
 הרצת פקודה בקונטיינר - docker exec container_name command
 מציג תהליכים - docker ps -a
 מחיקת קונטיינר - docekr rm container_name
 מציג רשימת מזהים של הקונטיינר - docker ps -qa
 מחיקת כל הקונטיינרים - docker rm -f $(docker ps -qa)
 מראה את כל התמונות - docker images
שלא ישאל שאלות באוטומציה - y-

רשת של קונטיינרים
יצירת רשת - docker network create my-network
הרצת שני קונטיינרים שונים על אותה הרשת - docker run -d --name web1 --network my-network nginx
docker run -d --name web2 --network my-network nginx
בדיקת רשת של קונטיינר ספציפי
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' web1
כניסה לטרמינל של קונטיינר - docker exec -it web1 /bin/bash
בדיקת תקשורת בין קונטיינרים על אותה הרשת - ping web2
בדיקת גישה לבקאנד של קונטיינר אחר - curl http://web2:80

יש אפשרות לבנות את כל הדוקר בדרך של docker compose
דוגמא: 
# docker-compose.yml
version: '3.8'
services:
  database:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret
    volumes:
      - db-data:/var/lib/mysql
  
  backend:
    image: my-api
    environment:
      DB_HOST: database
    ports:
      - "3000:3000"
    depends_on:
      - database
  
  frontend:
    image: my-web
    ports:
      - "8080:80"
    depends_on:
      - backend

volumes:
  db-data:

  Then just run: docker-compose up

