# import the opencv library
import cv2
import matplotlib.pyplot as plt
import numpy as np

class Detector:
    def __init__(self):
        # define a video capture object
        self.vid = cv2.VideoCapture(0)
        
        # load the class labels the model was trained on
        self.class_names = []
        with open("cv-weights-model/coco_names.txt", "r") as f:
            self.class_names = f.read().strip().split("\n")
            
        # path to the weights and model files
        weights = "cv-weights-model/frozen_inference_graph.pb"
        model = "cv-weights-model/ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt"
        # load the MobileNet SSD model trained  on the COCO dataset
        self.net = cv2.dnn.readNetFromTensorflow(weights, model)

    def runCV(self):   
        # Capture the video frame
        # by frame
        try:
            ret, frame = self.vid.read()

            ### Load Photo
            image = frame
        
        
            h = image.shape[0]   
            w = image.shape[1]    


            # create a blob from the image
            blob = cv2.dnn.blobFromImage(
                image, 1.0/127.5, (320, 320), [127.5, 127.5, 127.5])
            # pass the blog through our network and get the output predictions
            self.net.setInput(blob)
            output = self.net.forward() # shape: (1, 1, 100, 7)


            CURRENT_ITEMS = []

            # loop over the number of detected objects
            for detection in output[0, 0, :, :]: # output[0, 0, :, :] has a shape of: (100, 7)
                # the confidence of the model regarding the detected object
                probability = detection[2]

                # if the confidence of the model is lower than 50%,
                # we do nothing (continue looping)
                if probability < 0.5:
                    continue

                # perform element-wise multiplication to get
                # the (x, y) coordinates of the bounding box
                box = [int(a * b) for a, b in zip(detection[3:7], [w, h, w, h])]
                box = tuple(box)
                # draw the bounding box of the object
                cv2.rectangle(image, box[:2], box[2:], (0, 255, 0), thickness=2)

                # extract the ID of the detected object to get its name
                class_id = int(detection[1])
                # draw the name of the predicted object along with the probability
                label = f"{self.class_names[class_id - 1].upper()} {probability * 100:.2f}%"
                
                CURRENT_ITEMS.append(self.class_names[class_id - 1].upper())
                
                cv2.putText(image, label, (box[0], box[1] + 15),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
                
            

            # Display the resulting frame
            cv2.imshow('frame', frame)
            cv2.waitKey(1) # delays 1 ms to work live
            
            if (CURRENT_ITEMS == []): ## if its empty reload the video capture - my computer tends to shut off its camera
                self.vid = cv2.VideoCapture(0) 
                
            return (CURRENT_ITEMS)
        
        except: ## if an error throws reload the video capture - my computer tends to shut off its camera
            self.vid = cv2.VideoCapture(0) 

    def isItemDetected(self, item): 
        items = self.runCV()
        return item in items