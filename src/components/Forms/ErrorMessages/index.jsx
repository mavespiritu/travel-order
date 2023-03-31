const ErrorMessages = ({messages}) => {
    const messageList = []
    Object.keys(messages).forEach((key) => {
        messages[key].map((message, idx) => { 
            messageList.push(message)  
        }) 
    })

    return (
        <div className="my-5">
            <div className="bg-red-100 text-red-600 px-3 py-2 rounded">
                <span className="text-sm">
                The following errors must be resolved: <br />
                {  
                    messageList.map((message) => <li>{ message }</li>)
                }
                </span>
            </div>
        </div>
    )
  }
  
  export default ErrorMessages