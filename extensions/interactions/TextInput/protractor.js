// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview End-to-end testing utilities for the Text interaction.
 */

var objects = require('../../objects/protractor.js');

var customizeInteraction = function(elem, placeholderText, heightOfBox) {
  objects.UnicodeStringEditor(
    elem.element(by.tagName('schema-based-unicode-editor'))
  ).setValue(placeholderText);
  objects.IntEditor(
    elem.element(by.tagName('schema-based-int-editor'))
  ).setValue(heightOfBox);
};

var expectInteractionDetailsToMatch = function(elem, placeholderText, heightOfBox) {
  expect(
    elem.element(by.tagName('oppia-interactive-text-input')).isPresent()
  ).toBe(true);
  // TODO (Jacob) add checks for the placeholder text and box height
};

var submitAnswer = function(elem, answer) {
  // Try to get the text area element. If it doesn't exist, try input instead.
  // They are different depending on the height of the box.
  var textInputElem = elem.element(by.tagName('oppia-interactive-text-input'));
  var textAreaElem = textInputElem.element(by.tagName('textarea'));
  var inputElem = textInputElem.element(by.tagName('input'));
  textAreaElem.isPresent().then(function(present) {
    if (present) {
      textAreaElem.sendKeys(answer);
      textInputElem.element(by.tagName('button')).click();
    } else {
      // This must be chained in here due to the textInputElem possibly being
      // invisible after the longer text area submits, causing the instantiation
      // of this promise object to throw a validation error due to it referring
      // to an element which does not exist.
      inputElem.isPresent().then(function(present) {
        if (present) {
          inputElem.sendKeys(answer + '\n');
        }
      });
    }
  });
};

var answerObjectType = 'NormalizedString';

var testSuite = [{
  interactionArguments: ['placeholder', 4],
  ruleArguments: ['StartsWith', 'valid'],
  expectedInteractionDetails: ['placeholder', 4],
  wrongAnswers: ['invalid'],
  correctAnswers: ['valid']
}];

exports.customizeInteraction = customizeInteraction;
exports.expectInteractionDetailsToMatch = expectInteractionDetailsToMatch;
exports.submitAnswer = submitAnswer;
exports.answerObjectType = answerObjectType;
exports.testSuite = testSuite;
