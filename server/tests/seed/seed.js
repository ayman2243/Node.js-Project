//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const {ObjectID} = require('mongodb');

const {Annotation} = require('./../../models/annotation');
const {Folder} = require('./../../models/folder');
const {Interpreter} = require('./../../models/interpreter');
const {Resource} = require('./../../models/resource');
const {Topic} = require('./../../models/topic');

const Folder1 = new ObjectID();
const Interpreter1 = new ObjectID();
const Interpreter2 = new ObjectID();
const Resource1 = new ObjectID();
const Resource2 = new ObjectID();
const Annotation1 = new ObjectID();
const Annotation2 = new ObjectID();
const Topic1 = new ObjectID();
const Topic2 = new ObjectID();
const Topic3 = new ObjectID();

const folders = [{
  _id: Folder1,
  name: 'المجلد الاول',
  number: 1,
  description: 'المجلد الاول من موسوعة التفسير المأثور ويتضمن .... الخ'
}];

const interpreters = [{
  _id: Interpreter1,
  name: "Ayman User 1",
  type: "المقللون",
  rank: "100/200" ,
  dateDeath: "1618/08/11",
  numbersExplanation: 40,
  information: "هو اسمه ايمن الجوهري",
  timeline_id: new ObjectID(),
  symbol_id: new ObjectID()
    }, {
  _id: Interpreter2,
  name: "Ayman User 2",
  type: "المكثرون",
  rank: "500/1000" ,
  dateDeath: "1618/02/11",
  numbersExplanation: 100,
  information: " هو اسمه ايمن الجوهري رقم ٢",
  timeline_id: new ObjectID(),
  symbol_id: new ObjectID()
}];

const resources = [{
    _id: Resource1,
    name: "كتاب ابن كثير",
    information: "هو كتاب عن تفسير القرآن الكريم",
    interpreter_id: Interpreter1
      }, {
    _id: Resource2,
    name: "كتاب القرطيبي",
    information: "هو كتاب عن تفسير القرآن الكريم",
    interpreter_id: Interpreter2
}];

const annotation = [{
    _id: Annotation1,
    body: "حاشية لتفسير جزئ او كلمة من موضوع",
    type: "public",
    number: 12,
    resources:[
        {resource_id: Resource1}
    ]}, {
    _id: Annotation2,
    body: "حاشية لتفسير جزئ او كلمة من موضوع",
    type: "public",
    number: 12,
    resources:[
        {resource_id: Resource2}
    ]
}];

const topics = [{
    _id: Topic1,
    folder_id: Folder1,
    pageNumber: 10,
    headline: "الموضوع الاول من الكتاب",
    body: "هو كتاب اين كثير (١/٧٧) حاشية",
    annotation: [
        {charLocation: 5, annotation_id: Annotation1},
        {charLocation: 11, annotation_id: Annotation2}
     ]
    }, {
    _id: Topic2,
    topic_id: Topic1,
    folder_id: Folder1,
    pageNumber: 50,
    headline: "الموضوع الثاني من الكتاب",
    body: "هو كتاب اين كثير (١/٢٢) حاشية",
    annotation: [
        {charLocation: 5, annotation_id: Annotation1},
        {charLocation: 11, annotation_id: Annotation2}
        ]
    }, {
    _id: Topic3,
    folder_id: Folder1,
    pageNumber: 88,
    headline: "الموضوع الاول من الكتاب",
    body: "هو كتاب اين كثير (١/٧٧) حاشية"
}];

const populateFolders = (done) => {
    Folder.remove({}).then(() => {
        return Folder.insertMany(folders);
  }).then(() => done());
};

const populateInterpreters = (done) => {
    Interpreter.remove({}).then(() => {
        return Interpreter.insertMany(interpreters);
  }).then(() => done());
};

const populateResources = (done) => {
    Resource.remove({}).then(() => {
        return Resource.insertMany(resources);
  }).then(() => done());
};

const populateAnnotation = (done) => {
    Annotation.remove({}).then(() => {
        return Annotation.insertMany(annotation);
  }).then(() => done());
};

const populateTopics = (done) => {
    Topic.remove({}).then(() => {
        return Topic.insertMany(topics);
  }).then(() => done());
};

module.exports = {
                    folders, 
                    populateFolders, 
                    interpreters, 
                    populateInterpreters, 
                    resources, 
                    populateResources,
                    annotation,
                    populateAnnotation,
                    topics,
                    populateTopics
                 };
