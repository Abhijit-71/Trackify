import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheckBigIcon ,ShieldAlert , OctagonAlertIcon , InfoIcon ,CircleFadingArrowUpIcon} from "lucide-react";



function AlertSuccess(){
  
  return (
    <Alert className="text-left border-emerald-600/50 text-emerald-600 dark:border-emerald-600 [&>svg]:text-emerald-600 bg-emerald-500/10 top-4 fixed w-[80vw] z-99">
      <CircleCheckBigIcon className="h-4 w-4" />
      <AlertTitle>Operation Successful</AlertTitle>
      <AlertDescription>
        Your action has been completed successfully
      </AlertDescription>
    </Alert>
  );

}

function AlertError(){
  return (
    <Alert variant="destructive" className="top-4 fixed bg-destructive/10 w-[80vw] text-left z-99">
      <OctagonAlertIcon className="h-4 w-4" />
      <AlertTitle>Something Went Wrong</AlertTitle>
      <AlertDescription>
        An error occurred while processing your request.
      </AlertDescription>
    </Alert>
  );
}




function AlertInfo() {
  return (
    <Alert className="top-4 fixed border-cyan-600/50 text-cyan-600 dark:border-cyan-600 bg-blue-500/10 [&>svg]:text-cyan-600 w-[80vw] text-left z-99">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Important Information</AlertTitle>
      <AlertDescription>
        Make sure to review the recent updates before proceeding.
      </AlertDescription>
    </Alert>
  );
}



function AlertWarning() {
  return (
    <Alert className="top-4 fixed border-amber-500/50 text-amber-500 dark:border-amber-500 [&>svg]:text-amber-500 w-[80vw] text-left z-99">
      <ShieldAlert className="h-4 w-4" />
      <AlertTitle>Proceed with Caution</AlertTitle>
      <AlertDescription>
        This action might have unintended consequences.
      </AlertDescription>
    </Alert>
  );
}



function AlertAll() {
  return (
    <Alert className="top-4 fixed w-[80vw] text-left">
      <CircleFadingArrowUpIcon className="h-4 w-4" />
      <AlertTitle>Update Available</AlertTitle>
      <AlertDescription>
        A new version of the app is now available.
      </AlertDescription>
    </Alert>
  );
}

export {AlertSuccess,AlertError,AlertInfo,AlertWarning,AlertAll}