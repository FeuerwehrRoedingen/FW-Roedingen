import { Tooltip } from "@nextui-org/tooltip";


declare global {
  namespace JSX {
    interface IntrinsicElements {
      'status-indicator': { 
        active?:       boolean;
        positive?:     boolean;
        intermediary?: boolean; 
        negative?:     boolean;
        pulse?:        boolean;
      }
    }
  }
}

type IStatusIndicatorProps = {
  status: string;
}
export function StatusIndicator(props: IStatusIndicatorProps){

  let statuselement = <status-indicator active></status-indicator>

  if(props.status === 'online')
    statuselement = <status-indicator positive pulse></status-indicator>
  
  else if(props.status === 'slow')
    statuselement =  <status-indicator intermediary pulse></status-indicator>
  
  else if(props.status === 'offline')
    statuselement =  <status-indicator negative pulse></status-indicator>

  return (
    <Tooltip content={props.status}  placement="top">
      {statuselement}
    </Tooltip>
  )
}
