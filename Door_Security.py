# -------------------------------------IMPORT AREA------------------------------
from boltiot import Bolt,Sms
import conf, json, time, math, statistics
# -------------------------------------SECURITY---------------------------------
mybolt = Bolt(conf.API_KEY, conf.DEVICE_ID)
response=mybolt.isOnline() 
print(response)
sms = Sms(conf.SSID, conf.AUTH_TOKEN, conf.TO_NUMBER, conf.FROM_NUMBER)
history_data=[]
# ------------------------------------FUNCTION AREA-----------------------------
def exit_security():
    a=exit()
    print(eval(a))
# -------------------------------------PIN STRUCTURE ---------------------------
# 0- Red LED
# 1- Green LED
# 2- Open Moter
# 3- Close Moter
# 4- Buzzer
# --------------------------------------CODE AREA-------------------------------
print('==================================================================================')
print('|                       WELCOME TO DOOR SECURITY SYSTUM                          |')
print('|                                                           -by Aman Kanojiya    |')
print('==================================================================================')
print('\n\n')
wrong=0
while True:
    print(mybolt.digitalWrite('0','HIGH')) #start the red light of the door
    print("     1. Connect To Door")
    print('     2. Exit\n')
    # taking the input option
    login_choise=int(input("\tWhat Is Your Chooise(pls give the number of your chooise) :---> "))
    if (login_choise==1):
        print('\n\n')
        print('|                    You Have To Login To Access The Door                        |\n')
        print('-----------this both fields are case sensitive------------\n\n')
        # taking the username and password input
        username=str(input("                 USERNAME  -->>>  "))
        password=str(input("\n                 PASSWORD  -->>>  "))
        if (username==conf.USERNAME and password==conf.PASSWORD):
            # turn off the red light and turn on the green light
            print(mybolt.digitalWrite('0','LOW'))
            print(mybolt.digitalWrite('1','HIGH'))
            while True:
                print('\n\n     1. OPEN THE DOOR')
                print('     2. CLOSE THE DOOR')
                print('     3. HELP')
                print('     4. EXIT\n')
                open_choise=int(input("\tWhat Is Your Chooise(pls give the number of your chooise) :---> "))
                # taking the choise as input
                if open_choise==1:
                    # start the open moter
                    print(mybolt.digitalWrite('2',"HIGH"))
                    print(mybolt.digitalWrite('3',"LOW"))
                    time.sleep(5)
                    print(mybolt.digitalWrite('2',"LOW"))
                elif open_choise==2:
                    # start the close moter
                    print(mybolt.digitalWrite('3',"HIGH"))
                    print(mybolt.digitalWrite('2',"LOW"))
                    time.sleep(5)
                    print(mybolt.digitalWrite('3',"LOW"))
                elif open_choise==3:
                    # help to make them understand the working
                    print("help")
                elif open_choise==4:
                    # taking input for exit the scurity
                    exit_choise=str(input("\n\tIf You Realy Want To Exit (y/n) "))
                    if (exit_choise=='y' or exit_choise=="Y"):
                        print(mybolt.digitalWrite('1','LOW'))
                        print(mybolt.digitalWrite('0','LOW'))
                        exit_security()
                    elif (exit_choise=='n' or exit_choise=="N"):
                        continue
                    else:
                        print('\n\n*********************************YOU ENTERED A WRONG CHOOISE PLS TRY AGAIN***************************                          ******\n\n')
                        continue
                else:
                    print('\n\n*********************************YOU ENTERED A WRONG CHOOISE PLS TRY AGAIN*********************************                     \n\n')                    
                    continue
        else:
            if wrong<3:
                wrong=wrong+1
            else:
                # if the man is fake making the alert alarm on
                try:
                    print("Making request to Twilio to send a SMS")
                    response = sms.send_sms("I would Like to inform You That Any One is trying To Get In to Your Doore Security")
                    print("Response received from Twilio is: " + str(response))
                    print("Status of SMS at Twilio is :" + str(response.status))
                except Exception as e: 
                    print ("Error occured: Below are the details")
                    print (e)
                print("ALert ALert ALert ALert ALert ALert ALert ALert ALert ALert ALert ALert ALert ALert ALert ALert ALert ALert ALert                     ALert ALert ALert ALert ALert ALert ALert ALert ALert ALert                     ALert ALert ALert ALert ALert ALert ")
                print(mybolt.digitalWrite('4',"HIGH"))
                print(mybolt.digitalWrite('1','LOW'))
                print(mybolt.digitalWrite('0','LOW'))
                time.sleep(10)
                print(mybolt.digitalWrite('4',"LOW"))
                exit_security()
            print('\n\nXXXXXXXXXXXXXXXXXXXXXXXXXXXX   LOGIN UNSUCCESSFULL  XXXXXXXXXXXXXXXXXXX\n\n')
            continue
    elif (login_choise==2):
        exit_choise=str(input("\n\tIf You Realy Want To Exit (y/n)  "))
        if (exit_choise=='y' or exit_choise=="Y"):
            exit_security()
        elif (exit_choise=='n' or exit_choise=="N"):
            print('\n\n')
            continue
        else:
            print("wrong choise pls try agiain\n\n")
            continue
    else:
        print('\n\n*********************************YOU ENTERED A WRONG CHOOISE PLS TRY AGAIN*********************************\n\n')
        continue

    # ======================================================================
    