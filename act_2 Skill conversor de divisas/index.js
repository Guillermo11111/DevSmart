/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes=handlerInput.attributesManager.getRequestAttributes();
        const speaktotext=requestAttributes.t('BIENVENIDA');

        return handlerInput.responseBuilder
            .speak(speaktotext)
            .reprompt(speaktotext)
            .getResponse();
    }
    
};
const languageStrings = {
    es : {
        translation : {
            BIENVENIDA: `Hola, Bienvenido al conversor de divisas, prueba diciendo "Convierte 10 dólares a euros"`,
            ALGOMALPESOS: 'intenta diciendo un número positivo como 10 pesos',
            ALGOMALDOLARES: 'intenta diciendo un número positivo como 10 dólares',
            ALGOMALEUROS: 'intenta diciendo un número positivo como 10 euros',
            AYUDA: `Soy un conversor de divisas, prueba diciendo convierte 10 euros a pesos`,
            DESPEDIDA: 'Adios, Gracias por usar el conversor!',
            MXNTOUSD: '%s pesos equivale a %s dólares',
            USDTOMXN: '%s dólares equivale a %s pesos',
            MXNTOEUR:'%s pesos equivale a %s euros',
            EURTOMXN: '%s euros equivale a %s pesos',
            USDTOEUR: '%s dólares equivale a %s euros',
            EURTOUSD: '%s euros equivale a %s dólares',
            FALBACK: 'Lo siento, no se nada al respecto. Inténtalo de nuevo.'
        }
    },
    en : {
        translation : {
            BIENVENIDA: `Hello, Welcome to the currency converter, try saying "Convert 10 dollars to euros"`,
             ALGOMALPESOS: 'try saying a positive number like 10 pesos',
             ALGOMALDOLARES: 'try saying a positive number like 10 dollars',
             ALGOMALEUROS: 'try saying a positive number like 10 euros',
             AYUDA: `I am a currency converter, try saying convert 10 euros to pesos`,
             DESPEDIDA: 'Goodbye, Thank you for using the converter!',
             MXNTOUSD: '%s pesos equals %s dollars',
             USDTOMXN: '%s dollars equals %s pesos',
             MXNTOEUR:'%s pesos equals %s euros',
             EURTOMXN: '%s euros equals %s pesos',
             USDTOEUR: '%s dollars equals %s euros',
             EURTOUSD: '%s euros equals %s dollars',
             FALBACK: "Sorry, I don't know anything about it. Try again."
        }
    }
}

/////////********************//////////////////////////
const ConvertPesoEuro = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConvertirPesoEuro';
    },
    handle(handlerInput){
        const cantidad=handlerInput.requestEnvelope.request.intent.slots.pesos.value;
         const requestAttributes=handlerInput.attributesManager.getRequestAttributes();
        const speaktotext=requestAttributes.t('BIENVENIDA');
        if(cantidad>=1){
            const valor = 19.04;
            const resultado = (cantidad / valor).toFixed(2);
            const speakOutput=requestAttributes.t('MXNTOEUR',cantidad,resultado)
            return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('Desea convertir alguna otra cantidad?')
            .getResponse();
        }else{
            const speakOutput = "ingresa solo numeros positivos, como por ejemplo 6";
             return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Desea convertir alguna otra cantidad?')
            .getResponse();
        }
    }
}

const ConvertPesoDolar = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConvertirPesoDolar';
    },
    handle(handlerInput){
        const requestAttributes=handlerInput.attributesManager.getRequestAttributes();
        const cantidad=handlerInput.requestEnvelope.request.intent.slots.pesos.value;
        if(cantidad>=1){
            const valor = 17.58;
            const resultado = (cantidad / valor).toFixed(2);
            const speakOutput=requestAttributes.t('MXNTOUSD',cantidad,resultado);
            return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('Desea convertir alguna otra cantidad?')
            .getResponse();
        }else{
            const speakOutput = "ingresa solo numeros positivos, como por ejemplo 9";
             return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Desea convertir alguna otra cantidad?')
            .getResponse();
        }
    }
}
const ConvertDolarPeso = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConvertirDolarPeso';
    },
    handle(handlerInput){
        const cantidad=handlerInput.requestEnvelope.request.intent.slots.dolar.value;
        const requestAttributes=handlerInput.attributesManager.getRequestAttributes();
        if(cantidad>=1){
            const valor = 17.58;
            const resultado = (cantidad * valor).toFixed(2);
            const speakOutput=requestAttributes.t('USDTOMXN',cantidad,resultado);
            return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('Desea convertir alguna otra cantidad?')
            .getResponse();
        }else{
            const speakOutput = "ingresa solo numeros positivos, como por ejemplo 9";
             return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Desea convertir alguna otra cantidad?')
            .getResponse();
        }
    }
}
const ConvertEuroPeso = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConvertirEuroPeso';
    },
    handle(handlerInput){
        const cantidad=handlerInput.requestEnvelope.request.intent.slots.euros.value;
        const requestAttributes=handlerInput.attributesManager.getRequestAttributes();
        if(cantidad>=1){
            const valor = 19.06;
            const resultado = (cantidad * valor).toFixed(2);
            const speakOutput=requestAttributes.t('EURTOMXN',cantidad,resultado);
            return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('Desea convertir alguna otra cantidad?')
            .getResponse();
        }else{
            const speakOutput = "ingresa solo numeros positivos, como por ejemplo 5";
             return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Desea convertir alguna otra cantidad?')
            .getResponse();
        }
    }
}
const ConvertEuroDolar = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConvertirEuroDolar';
    },
    handle(handlerInput){
        const cantidad=handlerInput.requestEnvelope.request.intent.slots.euros.value;
        const requestAttributes=handlerInput.attributesManager.getRequestAttributes();
        if(cantidad>=1){
            const valor = 1.08;
            const resultado = (cantidad * valor).toFixed(2);
            const speakOutput=requestAttributes.t('EURTOUSD',cantidad,resultado);
            return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('Desea convertir alguna otra cantidad?')
            .getResponse();
        }else{
            const speakOutput = "ingresa solo numeros positivos, como por ejemplo 9";
             return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Desea convertir alguna otra cantidad?')
            .getResponse();
        }
    }
}
const ConvertDolarEuro = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConvertirDolarEuro';
    },
    handle(handlerInput){
        const cantidad=handlerInput.requestEnvelope.request.intent.slots.dolar.value;
        const requestAttributes=handlerInput.attributesManager.getRequestAttributes();
        if(cantidad>=1){
            const valor = 0.92;
            const resultado = (cantidad * valor).toFixed(2);
            const speakOutput=requestAttributes.t('USDTOEUR',cantidad,resultado);
            return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('Desea convertir alguna otra cantidad?')
            .getResponse();
        }else{
            const speakOutput = "ingresa solo numeros positivos, como por ejemplo 2";
             return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Desea convertir alguna otra cantidad?')
            .getResponse();
        }
    }
}
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`)
    }
}

const LoggingResponseInterceptor = {
    process(handlerInput, response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`)
    }
}

const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'es',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ConvertPesoEuro,
        ConvertPesoDolar,
        ConvertDolarPeso,
        ConvertEuroPeso,
        ConvertEuroDolar,
        ConvertDolarEuro,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(LoggingRequestInterceptor, LocalizationInterceptor)
    .addResponseInterceptors(LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();