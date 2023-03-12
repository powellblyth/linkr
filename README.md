# App name

Allows Zendesk to link to ERP

### The following information is displayed:

based on a tutorial here
https://developer.zendesk.com/documentation/apps/build-an-app/build-your-first-support-app/part-1-laying-the-groundwork/



`npm install @zendesk/zcli -g`
Checkit:
`zcli help`

then
`zcli login -i`
to connect to your zendesk server.
I suggest entering the email as `my@email.com/token`  and using your user's API ku.
If you don't have one, go to https://{{my-sub-domain-here}}.zendesk.com/admin/apps-integrations/apis/zendesk-api/settings



start the server with
`zcli apps:server`
https://d3v-powellblyth.zendesk.com/agent/tickets/1?zcli_apps=true to see the app in action

It's magic, the iframe loads into the browser