from cryptography.fernet import Fernet


def passwordhash(password, **kwargs):
    passkey =  Fernet.generate_key()
    fernate = Fernet(passkey)
    encpasssword = fernate.encrypt(password.encode())
    password = encpasssword.decode('utf-8')
    passwordkey = passkey.decode('utf-8')
    return  {"password":password ,"passwordkey":passwordkey}