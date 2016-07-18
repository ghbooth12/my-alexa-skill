/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Fun Facts for a fun fact"
 *  Alexa: "Here's your fun fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.18d808f7-5566-411f-8c3c-bc691bc3d35f"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing fun facts.
 */
var FACTS = [
    "Studies have shown that eating food without preservatives can improve IQ by up to fourteen percent.",
    "The most common lie is that, I am fine.",
    "People are most creative at night, and least creative in the afternoons.",
    "Humans can live longer without food than they can without sleep.",
    "Average calories consumed at a buffet is twenty five hundreds.",
    "If someone makes eye contact with you for sixty percent of a conversation, then they are bored. If eighty percent of the time, then they are attracted to you. And one hundred percent of the time, then they are threatening you.",
    "People are more likely to return a lost wallet, if there is a baby picture found inside of it.",
    "Unhappy people watch more TV.",
    "A small amount of stress helps you to remember things better, but a large amount may hinder your memory.",
    "If you fake a smile, even when you are in a bad mood, that smile will help you feel better. Therefore it will make you happy.",
    "Almost seventy thousands thoughts a day hit the average human mind.",
    "The highest calorie fast food item in the world is a milkshake.",
    "It takes 4 seconds for a silence to become awkward.",
    "Avocados are poisonous to birds.",
    "Tomatoes were thought to be poisonous.",
    "Eating sugar can give you wringkles.",
    "One can of soda contains 10 teaspoons of sugar.",
    "Ketchup was sold in the 1930s as medicine.",
    "Research shows that avoiding red meat improves the sex appeal of male body odour.",
    "According to the American Dietetic Association, ADA, a vegetarian or vegan diet is healthier than one that includes meat. Vegetarians have lower body mass indices, fewer deaths from heart disease, lower cholesterol, lower blood pressure, lower rates of type 2 diabetes, and lower rates of prostate and colon cancer.",
    "An acre of land can produce more food for vegetarians and vegans than meat eaters. It also can yield ten times more plant protein than meat protein.",
    "Grain that is used to feed livestock for meat production could feed 1 point 3 billion people.",
    "It takes a lot of water to produce meat. In actual fact, it takes 2,500 gallons to make just one pound of meat. On the other hand, it only takes 25 gallons of our valuable water to grow one pound of wheat.",
    "Most cases of food poisoning up to 80%, are due to infected meat.",
    "Vegan living often reduces the intake of saturated fat, animal hormones, and cholesterol while increasing the intake of fresh fruits and veggies. That has the potential to reduce the risk of cancer, diabetes, obesity, and heart disease.",
    "Chicken contains 266% more fat than it did 40 years ago.",
    "Almost half of the worlds food is thrown away every year.",
    "Honey is the only food that does not go bad. It can last 3000 years.",
    "Scientists can turn peanut butter into diamonds.",
    "Fortune cookies are not a traditional Chinese custom. They were invented in early 1900 in San Francisco.",
    "Dynamite is made with peanuts.",
    "India has the worlds lowest meat consumption per person.",
    "On August 10, 2015, NASA astronauts ate lettuce that had been grown in space for the first time.",
    "The tea bag was created by accident, as tea bags were originally sent as samples.",
    "The red food-coloring carmine, which is used in candies, is made from boiled cochineal bugs, a type of beetle.",
    "If improperly prepared, fugu, or puffer fish, can kill you since it contains a toxin 1,200 times deadlier than cyanide.",
    "Ranch dressing contains titanium dioxide, which is used to make it appear whiter. The same ingredient is used in sunscreen and paint for the same effect.",
    "Eating bananas can help prevent depression.",
    "Disney world is larger than 17 other countries.",
    "Otters sleep holding hands.",
    "Zebras are actually black with white stripes, not white with black stripes.",
    "You see your nose at all times, your brain just choose to ignore it.",
    "Flowers grow faster listening to music.",
    "There are more lifeforms living on your skin than there are people on the planet.",
    "Male bees die after mating.",
    "Falling coconuts kill more people than shark attacks.",
    "Hippos are responsible for more human fatalities in Africa than lions or tigers or cheetahs.",
    "The reason honey is so easy to digest is that it’s already been digested by a Bee.",
    "The brain is 80% water.",
    "Earthworms have up to five hearts.",
    "The wedding ring goes on the left ring finger because it is the only finger with a vein that connects to the heart.",
    "Nepal is the only country in the world with a national flag that is not rectangular or square.",
    "Killer Whales are dolphins.",
    "Almonds are members of the rose family.",
    "Banana is both a fruit and a herb.",
    "Pumpkin, squash, avocados, cucumbers, nuts, and grains are technically fruits.",
    "Processed meats such as bacon, sausages, and ham, do cause cancers, according to the World Health Organization, WHO."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * FunFacts is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a fun fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random fun fact from the fun facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the FunFacts skill.
    var fact = new Fact();
    fact.execute(event, context);
};
