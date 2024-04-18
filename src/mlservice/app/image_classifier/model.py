from pydantic import BaseModel

class TrainingRequest(BaseModel):
    def __init__(self, request):
        self.training_time = request['training_time']
        self.userEmail = request['userEmail']
        self.projectName = request['projectName']
        self.runName = request['runName']
        self.training_argument['ag_fit_args'] = dict()



