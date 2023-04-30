import urequests as requests

# Allow for connection to wireless
from wireless import connectWireless

# For GPIO access
from machine import Pin, ADC

# Allow delay
from time import sleep

# Init pins
strainGauge = ADC(2)
motionSensor = Pin(17, Pin.IN)
sendButton = Pin(16, Pin.IN)

# Connect to WiFi network
ip = connectWireless()
print(ip)

# Counters
motionCounter = 0
totalStrain = 0

while True:
    print(motionSensor.value())
    print(sendButton.value())
    if motionSensor.value() == True:
        motionCounter += 1
    totalStrain = totalStrain + strainGauge.read_u16()
    if sendButton.value() == True:
        maxStrain = (totalStrain/(motionCounter+1)) * 2.0
        payload = {
            "bridgeID": "S014 19287",
            "strain": totalStrain,
            "motionTraffic": motionCounter,
            "maxStrain": maxStrain,
            }
        r = requests.post("https://gg.bathost.net/api", json=payload)
        break
    sleep(1)