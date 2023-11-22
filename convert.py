import mariadb
import cv2
import sys
from tqdm import tqdm
import shutil

####################################################################################################
def SqlConnect():
    try:
        sql = mariadb.connect(
            user     = "root",
            password = "123",
            host     = "127.0.0.1",
            port     = 3306,
            database = "animedb"
        )
    except mariadb.Error as e:
        print(f"ERROR! Nie udało się połączyć z bazą danych: {e}")
        sys.exit(1)

    cur = sql.cursor()
    print('Dokonano połączenia z serverem SQL')
    return cur

def Miniature(img, id):
    size = (50, 70)
    mimg = cv2.resize(img, size, interpolation=cv2.INTER_LINEAR)
    cv2.imwrite(f"img/min/{id}.jpg", mimg, [cv2.IMWRITE_JPEG_QUALITY, 70])

def CheckJPG(path, id):
    temp = path.split(".")
    img = cv2.imread(path)
    Miniature(img, id)

    if(temp[1].lower() == "webp"):
        cv2.imwrite(f"img/res/{id}.jpg", img, [cv2.IMWRITE_JPEG_QUALITY, 70])
    else:
        shutil.copy2(path, f"img/res/{id}.jpg")
    

####################################################################################################
if(__name__ == "__main__"):
    c = SqlConnect()
    c.execute("SELECT anm_id, anm_img FROM anime")

    for id, img in tqdm(c):
        #CheckJPG(f"img/{img}", id)
        print(f"img/{img}    {id}")