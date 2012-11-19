# intend.utils.js
intend.utils.js was created with the intent of providing a generic way to communicate between JavaScript components through a loose coupling by expressing and registering intents.

### intend.register(action, topic, payloadType, handler, context)
The `intend.register()` method accepts an action (required) along with further deliminating arguments such as topic and payloadType which can also use a wildcard character (*) or undefined to match all items. An example of its usage is as follows:

`intend.register("Cache", "Set", "application/json", function (payload, intent) {
	console.log("Intent received!");
});
`
### intend.express(action, topic, payload, payloadType)
The `intend.express()` method accepts an action (required) along with further deliminating arguments such as topic and payloadType (which DO NOT support a wildcard character; it is expected that expressions are specific where as registrations are looser). The payload itself can be any native JavaScript type (number, string, JSON, etc).

`intend.express("Cache", "Set", { MyKey: "MyValue" }, "application/json");`

### Release Notes - 0.1.0-ALPHA
This is the first version committed to GitHub. This initial version supports registering and expressing intents with some basic wildcard matching capability. At this point, while a large amount of unit tests are provided, not all pieces have been properly tested in multiple browsers and optimiations have not yet been performed.

The goal of the next several releases is to get the correct functionality down, along with appropriate unit tests, so that before 1.0.0-GA is ready optimizations and bug fixes can occur.

