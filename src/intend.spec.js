(function () {
	describe("intend.js", function () {
		it ("Running unit tests against test build", function () {
			expect(intend.internals).not.to.be(undefined);
		});
		describe("utils", function () {
			describe("getVersion", function () {
				it("getVesion()", function () {
					expect(intend.internals.utils.getVersion()).not.to.be(undefined);
					expect(intend.internals.utils.getVersion().major).to.be(0);
					expect(intend.internals.utils.getVersion().minor).to.be(1);
					expect(intend.internals.utils.getVersion().maintenance).to.be(0);
					expect(intend.internals.utils.getVersion().type).to.be("ALPHA");
				});
			});
			describe("getVersionString", function () {
				it("getVersionString()", function () {
					expect(intend.internals.utils.getVersionString()).to.be("0.1.0-ALPHA");
				});
			});
			describe("isWildCardStringMatch", function () {
				it("isWildCardStringMatch('TestValue', 'TestValue') === true", function () {
					expect(intend.internals.utils.isWildCardStringMatch("TestValue", "TestValue")).to.be(true);
				});
				it("isWildCardStringMatch('TeStVaLuE', 'tEsTvAlUe') === true", function () {
					expect(intend.internals.utils.isWildCardStringMatch("TeStVaLuE", "tEsTvAlUe")).to.be(true);
				});
				it("isWildCardStringMatch(undefined, 'TestValue') === true", function () {
					expect(intend.internals.utils.isWildCardStringMatch(undefined, "TestValue")).to.be(true);
				});
				it("isWildCardStringMatch('TestValue', undefined) === true", function () {
					expect(intend.internals.utils.isWildCardStringMatch("TestValue", undefined)).to.be(true);
				});
				it("isWildCardStringMatch(undefined, undefined) === true", function () {
					expect(intend.internals.utils.isWildCardStringMatch(undefined, undefined)).to.be(true);
				});
				it("isWildCardStringMatch('', 'TestValue') === true", function () {
					expect(intend.internals.utils.isWildCardStringMatch("", "TestValue")).to.be(true);
				});
				it("isWildCardStringMatch('TestValue', '') === true", function () {
					expect(intend.internals.utils.isWildCardStringMatch("TestValue", "")).to.be(true);
				});
				it("isWildCardStringMatch('', '') === true", function () {
					expect(intend.internals.utils.isWildCardStringMatch("", "")).to.be(true);
				});
				it("isWildCardStringMatch('*', 'TestValue') === true", function () {
					expect(intend.internals.utils.isWildCardStringMatch("*", "TestValue")).to.be(true);
				});
				it("isWildCardStringMatch('TestValue', '*') === true", function () {
					expect(intend.internals.utils.isWildCardStringMatch("TestValue", "*")).to.be(true);
				});
				it("isWildCardStringMatch('Test*', 'TestValue') === true", function () {
					expect(intend.internals.utils.isWildCardStringMatch("Test*", "TestValue")).to.be(true);
				});
				it("isWildCardStringMatch('TestValue', 'Test*') === true", function () {
					expect(intend.internals.utils.isWildCardStringMatch("TestValue", "Test*")).to.be(true);
				});
				it("isWildCardStringMatch('*', undefined) === true", function () {
					expect(intend.internals.utils.isWildCardStringMatch("*", undefined)).to.be(true);
				});
				it("isWildCardStringMatch(undefined, '*') === true", function () {
					expect(intend.internals.utils.isWildCardStringMatch(undefined, "*")).to.be(true);
				});
				it("isWildCardStringMatch('TestValue', 'TestVal') === false", function () {
					expect(intend.internals.utils.isWildCardStringMatch("TestValue", "TestVal")).to.be(false);
				});
				it("isWildCardStringMatch('Test*', 'Tesst') === false", function () {
					expect(intend.internals.utils.isWildCardStringMatch("Test*", "Tesst")).to.be(false);
				});
				it("isWildCardStringMatch({ }, { }) === false", function () {
					expect(intend.internals.utils.isWildCardStringMatch({ }, { })).to.be(false);
				});
				it("isWildCardStringMatch([], { }) === false", function () {
					expect(intend.internals.utils.isWildCardStringMatch([], { })).to.be(false);
				});
				it("isWildCardStringMatch({ }, []) === false", function () {
					expect(intend.internals.utils.isWildCardStringMatch({ }, [])).to.be(false);
				});
				it("isWildCardStringMatch([], []) === false", function () {
					expect(intend.internals.utils.isWildCardStringMatch([], [])).to.be(false);
				});
				it("isWildCardStringMatch([], undefined) === false", function () {
					expect(intend.internals.utils.isWildCardStringMatch([], undefined)).to.be(false);
				});
				it("isWildCardStringMatch(undefined, []) === false", function () {
					expect(intend.internals.utils.isWildCardStringMatch(undefined, [])).to.be(false);
				});
				it("isWildCardStringMatch({ }, undefined) === false", function () {
					expect(intend.internals.utils.isWildCardStringMatch({ }, undefined)).to.be(false);
				});
				it("isWildCardStringMatch(undefined, { }) === false", function () {
					expect(intend.internals.utils.isWildCardStringMatch(undefined, { })).to.be(false);
				});
			});
			describe("isEmptyString", function () {
				it("isEmptyString('') === true", function () {
					expect(intend.internals.utils.isEmptyString("")).to.be(true);
				});
				it("isEmptyString(undefined) === true", function () {
					expect(intend.internals.utils.isEmptyString(undefined)).to.be(true);
				});
				it("isEmptyString(null) === true", function () {
					expect(intend.internals.utils.isEmptyString(null)).to.be(true);
				});
				it("isEmptyString(' ') === false", function () {
					expect(intend.internals.utils.isEmptyString(" ")).to.be(false);
				});
				it("isEmptyString('Text') === false", function () {
					expect(intend.internals.utils.isEmptyString("Text")).to.be(false);
				});
				it("isEmptyString([]) === undefined", function () {
					expect(intend.internals.utils.isEmptyString([])).to.be(undefined);
				});
				it("isEmptyString([1,2,3,4,5]) === undefined", function () {
					expect(intend.internals.utils.isEmptyString([1,2,3,4,5])).to.be(undefined);
				});
				it("isEmptyString({ }) === undefined", function () {
					expect(intend.internals.utils.isEmptyString({ })).to.be(undefined);
				});
			});
			describe("isString", function () {
				it("isString('') === true", function () {
					expect(intend.internals.utils.isString("")).to.be(true);
				});
				it("isString('Test') === true", function () {
					expect(intend.internals.utils.isString("Test")).to.be(true);
				});
				it("isString(undefined) === false", function () {
					expect(intend.internals.utils.isString(undefined)).to.be(false);
				});
				it("isString(null) === false", function () {
					expect(intend.internals.utils.isString(null)).to.be(false);
				});
				it("isString({ }) === false", function () {
					expect(intend.internals.utils.isString({ })).to.be(false);
				});
				it("isString([]) === false", function () {
					expect(intend.internals.utils.isString([])).to.be(false);
				});
			});
		});
		describe("delegator", function () {
			beforeEach(function () {
				intend.internals.delegator.clearDelegates();
			});
			it("registerDelegate", function () {
				var delegateId = intend.internals.delegator.registerDelegate(undefined, undefined, function () { }, this);
				expect(intend.internals.delegator.getDelegates()[delegateId]).not.to.be(undefined);
			});
			it("executeDelegate", function () {
				var value = "" + Math.random() + Math.random();
				var delegateId = intend.internals.delegator.registerDelegate(undefined, undefined, function (str) {
					return str;
				}, this);
				expect(intend.internals.delegator.executeDelegate(delegateId, value)).to.be(value);
			});
			it("executeAsyncDelegate", function (done) {
				var value = "" + Math.random() + Math.random();
				var returnedValue = undefined;

				var delegateId = intend.internals.delegator.registerDelegate(undefined, undefined, function (str) {
					expect(str).to.be(value);
					done();
				}, this);
				
				intend.internals.delegator.executeAsyncDelegate(delegateId, value);
			});
			it("removeDelegate", function () {
				var delegateId = intend.internals.delegator.registerDelegate(undefined, undefined, function () { }, this);
				intend.internals.delegator.removeDelegate(delegateId);
				expect(intend.internals.delegator.getDelegates()[delegateId]).to.be(undefined);
			});
		});
		describe("intents", function () {
			beforeEach(function () {
				intend.internals.intents.clearRegistrations();
			});
			describe("register",function () {
				it("register('MyAction', 'MyTopic', 'MyPayloadType', function () { }) is registered", function () {
					intend.internals.intents.register("MyAction", "MyTopic", "MyPayloadType", function () { });
					expect(intend.internals.intents.getMatchingDelegates("MyAction", "MyTopic", "MyPayloadType").length).to.be(1);
				});
				it("register('MyAction', undefined, 'MyPayloadType', function () { }) is registered", function () {
					intend.internals.intents.register("MyAction", undefined, "MyPayloadType", function () { });
					expect(intend.internals.intents.getMatchingDelegates("MyAction", undefined, "MyPayloadType").length).to.be(1);
				});
				it("register('MyAction', 'MyTopic', undefined, function () { }) is registered", function () {
					intend.internals.intents.register("MyAction", "MyTopic", undefined, function () { });
					expect(intend.internals.intents.getMatchingDelegates("MyAction", "MyTopic", undefined).length).to.be(1);
				});
				it("register('MyAction', undefined, undefined, function () { }) is registered", function () {
					intend.internals.intents.register("MyAction", undefined, undefined, function () { });
					expect(intend.internals.intents.getMatchingDelegates("MyAction", undefined, undefined).length).to.be(1);
				});
				it("register(undefined, undefined, undefined, function () { }) will throw exception", function () {
					expect(function () {
						intend.internals.intents.register(undefined, undefined, undefined, function () { });
					}).to.throwException();
				});
			});
			describe("getMatchingDelegates", function () {
				it("getMatchingDelegates('MyAction', 'MyTopic', 'MyPayloadType') matches register('MyAction', 'MyTopic', 'MyPayloadType', function () { })", function () {
					intend.internals.intents.register("MyAction", "MyTopic", "MyPayloadType", function () { });
					expect(intend.internals.intents.getMatchingDelegates("MyAction", "MyTopic", "MyPayloadType").length).to.be.greaterThan(0);
				});
				it("getMatchingDelegates('MyAction', '*', 'MyPayloadType') matches register('MyAction', 'MyTopic', 'MyPayloadType', function () { })", function () {
					intend.internals.intents.register("MyAction", "MyTopic", "MyPayloadType", function () { });
					expect(intend.internals.intents.getMatchingDelegates("MyAction", "*", "MyPayloadType").length).to.be.greaterThan(0);
				});
				it("getMatchingDelegates('MyAction', 'MyTopic', '*') matches register('MyAction', 'MyTopic', 'MyPayloadType', function () { })", function () {
					intend.internals.intents.register("MyAction", "MyTopic", "MyPayloadType", function () { });
					expect(intend.internals.intents.getMatchingDelegates("MyAction", "MyTopic", "*").length).to.be.greaterThan(0);
				});
				it("getMatchingDelegates('MyAction', '*', '*') matches register('MyAction', 'MyTopic', 'MyPayloadType', function () { })", function () {
					intend.internals.intents.register("MyAction", "MyTopic", "MyPayloadType", function () { });
					expect(intend.internals.intents.getMatchingDelegates("MyAction", "*", "*").length).to.be.greaterThan(0);
				});
				it("getMatchingDelegates('MyAction', 'MyTopic', 'MyPay*') matches register('MyAction', 'MyTopic', 'MyPayloadType', function () { })", function () {
					intend.internals.intents.register("MyAction", "MyTopic", "MyPayloadType", function () { });
					expect(intend.internals.intents.getMatchingDelegates("MyAction", "MyTopic", "MyPay*").length).to.be.greaterThan(0);
				});
				it("getMatchingDelegates('MyAction', 'MyTop*', 'MyPayloadType') matches register('MyAction', 'MyTopic', 'MyPayloadType', function () { })", function () {
					intend.internals.intents.register("MyAction", "MyTopic", "MyPayloadType", function () { });
					expect(intend.internals.intents.getMatchingDelegates("MyAction", "MyTop*", "MyPayloadType").length).to.be.greaterThan(0);
				});
				it("getMatchingDelegates('MyAction', undefined, 'MyPayloadType') matches register('MyAction', 'MyTopic', 'MyPayloadType', function () { })", function () {
					intend.internals.intents.register("MyAction", "MyTopic", "MyPayloadType", function () { });
					expect(intend.internals.intents.getMatchingDelegates("MyAction", undefined, "MyPayloadType").length).to.be.greaterThan(0);
				});
				it("getMatchingDelegates('MyAction', 'MyTopic', undefined) matches register('MyAction', 'MyTopic', 'MyPayloadType', function () { })", function () {
					intend.internals.intents.register("MyAction", "MyTopic", "MyPayloadType", function () { });
					expect(intend.internals.intents.getMatchingDelegates("MyAction", "MyTopic", undefined).length).to.be.greaterThan(0);
				});
				it("getMatchingDelegates('MyAction', undefined, undefined) matches register('MyAction', 'MyTopic', 'MyPayloadType', function () { })", function () {
					intend.internals.intents.register("MyAction", "MyTopic", "MyPayloadType", function () { });
					expect(intend.internals.intents.getMatchingDelegates("MyAction", undefined, undefined).length).to.be.greaterThan(0);
				});
				it("getMatchingDelegates('MyAction') matches register('MyAction', 'MyTopic', 'MyPayloadType', function () { })", function () {
					intend.internals.intents.register("MyAction", "MyTopic", "MyPayloadType", function () { });
					expect(intend.internals.intents.getMatchingDelegates("MyAction").length).to.be.greaterThan(0);
				});
			});
			describe("unregister", function () {
				it("unregister('MyAction', 'MyTopic', 'MyPayloadType') unregisters.", function () {
					intend.internals.intents.register("MyAction", "MyTopic", "MyPayloadType", function () { });
					expect(intend.internals.intents.unregister("MyAction", "MyTopic", "MyPayloadType")).to.be(true);
					expect(intend.internals.intents.getMatchingDelegates("MyAction", "MyTopic", "MyPayloadType").length).to.be(0);
				});
				it("unregister('MyAction', 'MyTop*', 'MyPayloadType') unregisters.", function () {
					intend.internals.intents.register("MyAction", "MyTop*", "MyPayloadType", function () { });
					expect(intend.internals.intents.unregister("MyAction", "MyTop*", "MyPayloadType")).to.be(true);
					expect(intend.internals.intents.getMatchingDelegates("MyAction", "MyTop*", "MyPayloadType").length).to.be(0);
				});
				it("unregister('MyAction', 'MyTopic', 'MyPay*') unregisters.", function () {
					intend.internals.intents.register("MyAction", "MyTopic", "MyPay*", function () { });
					expect(intend.internals.intents.unregister("MyAction", "MyTopic", "MyPay*")).to.be(true);
					expect(intend.internals.intents.getMatchingDelegates("MyAction", "MyTopic", "MyPay*").length).to.be(0);
				});
				it("unregister('MyAction', undefined, 'MyPayloadType') unregisters.", function () {
					intend.internals.intents.register("MyAction", undefined, "MyPayloadType", function () { });
					expect(intend.internals.intents.unregister("MyAction", undefined, "MyPayloadType")).to.be(true);
					expect(intend.internals.intents.getMatchingDelegates("MyAction", undefined, "MyPayloadType").length).to.be(0);
				});
				it("unregister('MyAction', 'MyTopic', undefined) unregisters.", function () {
					intend.internals.intents.register("MyAction", "MyTopic", undefined, function () { });
					expect(intend.internals.intents.unregister("MyAction", "MyTopic", undefined)).to.be(true);
					expect(intend.internals.intents.getMatchingDelegates("MyAction", "MyTopic", undefined).length).to.be(0);
				});
				it("unregister('MyAction', undefined, undefined) unregisters.", function () {
					intend.internals.intents.register("MyAction", undefined, undefined, function () { });
					expect(intend.internals.intents.unregister("MyAction", undefined, undefined)).to.be(true);
					expect(intend.internals.intents.getMatchingDelegates("MyAction", undefined, undefined).length).to.be(0);
				});
				it("unregister('MyAction') unregisters.", function () {
					intend.internals.intents.register("MyAction", undefined, undefined, function () { });
					expect(intend.internals.intents.unregister("MyAction")).to.be(true);
					expect(intend.internals.intents.getMatchingDelegates("MyAction").length).to.be(0);
				});
			});
			describe("express", function () {
				it("express('MyAction', 'MyTopic', { test: 'test' }, 'MyPayloadType') hits register('MyAction', 'MyTopic', 'MyPayloadType', function () { })", function (done) {
					intend.internals.intents.register("MyAction", "MyTopic", "MyPayloadType", function (payload, intent) {
						expect(payload).not.to.be(undefined);
						expect(payload.test).to.be("test");
						done();
					}, this);

					intend.internals.intents.express("MyAction", "MyTopic", { test: "test" }, "MyPayloadType");
				});
				it("express('MyAction', 'TestTopic', { TestTopic: 'test' }, 'TestTopicType') hits register('MyAction', 'TestTopic', 'Test*', function () { })");
				it("express('MyAction', 'TestTopic', { TestTopic: 'test' }, 'TestTopicType') hits register('MyAction', 'Test*', 'TestTopicType', function () { })");
				it("express('MyAction', 'TestTopic', { TestTopic: 'test' }, 'TestTopicType') hits register('MyAction', undefined, 'TestTopicType', function () { })");
				it("express('MyAction', 'TestTopic', { TestTopic: 'test' }, 'TestTopicType') hits register('MyAction', 'TestTopic', undefined, function () { })");
				it("express('MyAction', 'TestTopic', { TestTopic: 'test' }, 'TestTopicType') hits register('MyAction', undefined, undefined, function () { })");
				it("express('MyAction', 'TestTopic', { TestTopic: 'test' }, 'TestTopicType') hits register('MyAction', '*', undefined, function () { })");
				it("express('MyAction', 'TestTopic', { TestTopic: 'test' }, 'TestTopicType') hits register('MyAction', undefined, '*', function () { })");
				it("express('MyAction', 'TestTopic', { TestTopic: 'test' }, 'TestTopicType') hits register('MyAction', '*', '*', function () { })");
				it("express('MyAction', 'MyTopic', { test: 'test' }, 'MyPayloadType') does NOT hit register('MyAction', 'MyTopic', 'AnotherPayloadType', function () { })", function (done) {
					intend.internals.intents.register("MyAction", "MyTopic", "AnotherPayloadType", function (payload, intent) {
						expect().fail();
						done();
					}, this);
					intend.internals.intents.express("MyAction", "MyTopic", { test: "test" }, "MyPayloadType");
					this.timeout(0);
					setTimeout(done, 50);
				});
			});
		});
	});
}());