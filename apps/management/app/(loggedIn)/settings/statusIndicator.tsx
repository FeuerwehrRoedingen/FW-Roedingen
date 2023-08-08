
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
  if(props.status === 'online')
    return <status-indicator intermediary pulse></status-indicator>
  
  if(props.status === 'slow')
    return <status-indicator intermediary pulse></status-indicator>
  
  if(props.status === 'offline')
    return <status-indicator negative pulse></status-indicator>

  return <status-indicator active></status-indicator>
}