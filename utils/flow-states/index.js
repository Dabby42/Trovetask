export const trigger = ({ name, next }) => {
    return ({
        "transitions": [
            {
                "event": "incomingMessage",
                "next": next
            },
            // {
            //     "event": "incomingCall",
            //     "next": ""
            // },
            // {
            //     "event": "incomingRequest",
            //     "next": ""
            // }
        ],
        "type": "trigger",
        "name": name,
        "properties": {
            "offset": {
                "y": 0,
                "x": 0
            }
        }
    });
}

export const sendToAutopilot = ({ name, botId, next  }) => {
    return ({
        "transitions": [
            {
                "event": "sessionEnded",
                "next": next
            },
            // {
            //     "event": "failure",
            //     "next": ""
            // }
        ],
        "type": "send-to-auto-pilot",
        "name": name,
        "properties": {
            "body": "{{trigger.message.Body}}",
            "from": "{{flow.channel.address}}",
            "chat_service": "{{trigger.message.InstanceSid}}",
            "timeout": 14400,
            "offset": {
                "y": 200,
                "x": 200
            },
            "chat_channel": "{{trigger.message.ChannelSid}}",
            "autopilot_assistant_sid": botId
        }
    });
}

export const splitBasedOn = ({ name, autopilotWidgetName, next  }) => {
    return ({
        "transitions": [
            // {
            //     "event": "noMatch",
            //     "next": ""
            // },
            {
                "conditions": [
                    {
                        "type": "equal_to",
                        "friendly_name": "SENDTOAGENT==TRUE",
                        "arguments": [
                            `{{widgets.${autopilotWidgetName}.memory.sendToAgent}}`
                        ],
                        "value": true
                    }
                ],
                "event": "match",
                "next": next
            }
        ],
        "type": "split-based-on",
        "name": name,
        "properties": {
            "input": `{{widgets.${autopilotWidgetName}.memory.sendToAgent}}`,
            "offset": {
                "y": 500,
                "x": -200
            }
        }
    });
}

export const sendToFlex = () => {
    return ({
        "transitions": [
            {
                "event": "callComplete",
                "next": ""
            },
            {
                "event": "failedToEnqueue",
                "next": ""
            },
            {
                "event": "callFailure",
                "next": ""
            }
        ],
        "type": "send-to-flex",
        "name": "send_to_flex_1",
        "properties": {
            "workflow": "WW11111111111111111111111111111111",
            "channel": "TC11111111111111111111111111111111",
            "offset": {
                "y": 800,
                "x": 30
            }
        }
    });
}

export const makeHttpRequest = ({ name, url='https://funny-name-1234.twil.io/', autopilotWidgetName }) => {
    return ({
        "transitions": [
            // {
            //     "event": "success",
            //     "next": ""
            // },
            // {
            //     "event": "failed",
            //     "next": ""
            // }
        ],
        "type": "make-http-request",
        "name": name,
        "properties": {
            "url": url,
            "parameters": [
                {
                    "key": "count",
                    "value": "{{flow.variables.count}}"
                }
            ],
            "method": "POST",
            "content_type": "application/json",
            "body": JSON.stringify({
                "autopilot": { 
                    "memory": `{{widgets.${autopilotWidgetName}.memory | to_json}}` 
                }
            }),
            "offset": {
                "y": 800,
                "x": 30
            }
        }
    });
}
