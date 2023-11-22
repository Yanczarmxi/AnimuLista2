# Module Imports
import mariadb
import sys

with open('img/users/untitled.jpg', 'rb') as file:
    data = file.read()

# Connect to MariaDB Platform
try:
    conn = mariadb.connect(
        user="root",
        password="123",
        host="127.0.0.1",
        port=3306,
        database="animedb"

    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

# Get Cursor
cur = conn.cursor()

cur.execute("UPDATE users SET avatar = ? WHERE id = 1", (data,))

conn.commit()
conn.close()