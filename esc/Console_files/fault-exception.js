define([],function(){var exceptionMap={"fault_0001":{"cause":"Program internal error.","desc":"Internal error.","solution":"Contact the administrator."},"fault_0002":{"cause":"Email sending test failed.","desc":"The related service has not been started, or the IP address, user name, or password is incorrect.","solution":"1. Check whether the related services are started or the IP address is correct. 2. Contact the administrator."},"fault_0003":{"cause":"The masking of the alarm has been canceled.","desc":"Failed to cancel the masking of the alarm.","solution":"Select the to-be-masked alarm again."},"fault_0004":{"cause":"The total number of alarm masking records after alarm masking records are added in batches exceeds the upper limit 50.","desc":"Failed to add alarm masking records in batches.","solution":"Ensure that the total number of alarm masking records does not exceed 50 after alarm masking records are added."},"fault_0005":{"cause":"The current user has no permission to perform this operation.","desc":"Unauthorized operation.","solution":"Check whether the current user has the permission to perform this operation."},"fault_0006":{"cause":"The parameters are set incorrectly or left blank.","desc":"Failed to save the SNMP management station information.","solution":"1. Check whether the parameters are set correctly. 2. Contact the administrator."},"fault_0007":{"cause":"The interface is not supported or not implemented.","desc":"Bottom layer error.","solution":"Check whether the interface exists or is implemented."},"fault_0008":{"cause":"Program internal error.","desc":"Internal error.","solution":"Contact the administrator."},"fault_0009":{"cause":"The entered alarm is incorrect.","desc":"Manual clearance failed.","solution":"Enter a correct alarm."},"fault_0010":{"cause":"New alarms are reported during manual clearance.","desc":"Manual clearance failed.","solution":"Do not manually clear alarms when new alarms are reported."},"fault_0011":{"cause":"Network error.","desc":"Manual clearance timed out and failed.","solution":"Check whether the network is normal."},"fault_0012":{"cause":"The alarm cannot be manually cleared.","desc":"The alarm cannot be manually cleared.","solution":"Contact the administrator or view the help information about manual clearance."},"fault_0013":{"cause":"The alarm has been cleared.","desc":"The alarm does not exist.","solution":"Select an alarm that has not been manually cleared."},"fault_0014":{"cause":"The alarm has been cleared.","desc":"Failed to clear the alarm.","solution":"Select another alarm."},"fault_0015":{"cause":"The receiving mailbox address has been added.","desc":"The receiving mailbox address already exists.","solution":"Set the receiving mailbox address again."},"fault_0016":{"cause":"The receiving phone number has been added.","desc":"The receiving phone number already exists.","solution":"Set the receiving phone number again."},"fault_0017":{"cause":"SMS test failed.","desc":"SMS configuration parameter settings are incorrect, or the user name or password is incorrect.","solution":"Correct the SMS configuration parameter settings, user name, and password. "},"fault_0018":{"cause":"The number of email recipients added at a time exceeds the upper limit.","desc":"Failed to add email recipients.","solution":"Ensure that the number of email recipients added at a time does not exceed the upper limit."},"fault_0019":{"cause":"The number of SMS recipients added at a time exceeds the upper limit.","desc":"Failed to add SMS recipients.","solution":"Ensure that the number of SMS recipients added at a time does not exceed the upper limit."},"fault_0020":{"cause":"The SMS recipient does not exist.","desc":"The SMS fails to be received.","solution":"Enter the SMS recipient on the Alarm SMS Notification tab page."},"fault_0021":{"cause":"The email recipient does not exist.","desc":"The email fails to be received.","solution":"Add the email recipient in the alarm settings."},"fault_0022":{"cause":"The alarm ID and component type do not exist or do not match.","desc":"The alarm ID and component type do not exist.","solution":"Enter the correct alarm ID and component type."},"fault_0023":{"cause":"Duplicate IP address.","desc":"Failed to add the third-party component.","solution":"Select the IP address of the third-party component again."},"fault_0024":{"cause":"Duplicate component name.","desc":"Failed to add the third-party component.","solution":"Select the name of the third-party component again."},"fault_0025":{"cause":"The number of third-party components exceeds the upper limit.","desc":"Failed to add the third-party component.","solution":"Check whether the number of third-party components exceeds the upper limit."},"fault_0026":{"cause":"Duplicate IP address.","desc":"Failed to modify the third-party component.","solution":"Select the IP address of the third-party component again."},"fault_0027":{"cause":"Duplicate component name.","desc":"Failed to modify the third-party component.","solution":"Select the name of the third-party component again."},"fault_0028":{"cause":"The third-party component has not been added.","desc":"The third-party component does not exist.","solution":"Select an existing third-party component."},"fault_0029":{"cause":"The SNMP management station IP address cannot be the same as the ServiceCenter IP address.","desc":"Failed to save the SNMP management station.","solution":"Select a correct IP address."},"fault_0030":{"cause":"The third-party component IP address cannot be the same as the ServiceCenter IP address.","desc":"Failed to save the SNMP management station.","solution":"Select a correct IP address."},"fault_0031":{"cause":"The alarm threshold parameters fail to be modified.","desc":"Failed to modify the alarm thresholds.","solution":"Check whether the parameters are modified correctly."},"fault_0032":{"cause":"The alarm has been masked and cannot be masked repeatedly.","desc":"The alarm has been masked.","solution":"Select the to-be-masked alarm again."},"fault_0033":{"cause":"The alarm threshold parameters are modified incorrectly. The threshold values for different severities of alarms must meet the following condition: Critical alarm threshold > Major alarm threshold > Minor alarm threshold > Warning alarm threshold.","desc":"Failed to modify the alarm thresholds.","solution":"Enter correct alarm thresholds."},"fault_0034":{"cause":"Internal error.","desc":"Manual clearance failed.","solution":"Contact the administrator."},"fault_0035":{"cause":"SNMP parameter error.","desc":"SNMP management station test failed.","solution":"Check whether the parameter settings are correct."},"fault_0036":{"cause":"The number of concurrent alarm export operations exceeds the upper limit.","desc":"Failed to export the alarms.","solution":"Try again later."},"fault_0037":{"cause":"Duplicated recipient address.","desc":"Duplicate receiving mailbox address.","solution":"Add another receiving mailbox address in the alarm settings."},"fault_0038":{"cause":"The parameter settings do not meet the requirements.","desc":"Invalid parameter.","solution":"Set the parameters correctly."},"fault_0041":{"cause":"The current user has no permission to perform this operation.","desc":"Unauthorized operation.","solution":"Check whether the current user has the permission to perform this operation."},"fault_0046":{"cause":"The email address has been tested successfully. If you need to continue with the test, try again 5 minutes later or use another email address.","desc":"The test cannot be performed again within 5 minutes.","solution":"Try again 5 minutes later or use another email address."},"fault_0047":{"cause":"The test on the user name or password has failed for 5 times within 5 minutes. If you need to continue with the test, try again 5 minutes later or use another user.","desc":"Incorrect user name or password of the mail server.","solution":"Check whether the user name and password are correct."},"fault_0048":{"cause":"If you need to continue with the test, try again 5 minutes later or use another mobile number.","desc":"The test cannot be performed again within 5 minutes. The mobile number has been tested successfully. ","solution":"Try again 5 minutes later or use another mobile number."},"fault_0049":{"cause":"The test on the user name or password has failed for 5 times within 5 minutes. If you need to continue with the test, try again 5 minutes later or use another user.","desc":"Incorrect user name or password of the SMS server.","solution":"Check whether the user name and password are correct."},"fault_0050":{"cause":"Incorrect test email address format.","desc":"Email sending test failed.","solution":"1. Check whether the test email address meets the following requirements: The email address can contain a maximum of 64 characters in the format of local-part@domain. The part before the @ symbol (local-part) can use letters or digits (0 to 9). The part after the @ symbol (domain) can use letters or digits (0 to 9) and must end with a letter. 2. Contact the administrator."}};return exceptionMap});