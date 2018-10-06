//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Annotation} = require('./../models/annotation');
const {Folder} = require('./../models/folder');
const {Interpreter} = require('./../models/interpreter');
const {Resource} = require('./../models/resource');
const {Topic} = require('./../models/topic');

const { folders, populateFolders, interpreters, populateInterpreters, resources, populateResources, annotation, populateAnnotation, topics, populateTopics } = require('./seed/seed');

beforeEach(populateFolders);
beforeEach(populateInterpreters);
beforeEach(populateResources);
beforeEach(populateAnnotation);
beforeEach(populateTopics);

describe('Test Folder Routes <---------------------------', () => {

    describe('POST /api/folder', () => {
        it('should create new folder', (done) => {
            var folder = {
                name:  'المجلد الثالث',
                number: 3
            }
            request(app)
                .post('/api/folder')
                .set('Content-Type', 'application/json')
                .send(folder)
                .expect(200)
                .expect((res) => {
                    expect(res.body.name).toBe(folder.name);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    Folder.find(folder).then((doc) => {
                        expect(doc.length).toBe(1);
                        expect(doc[0].name).toBe(folder.name);
                        done();
                    }).catch((e) => done(e));
                });
        });

        it('should not create new folder with empty name', (done) => {
            var folder = {
                name: " ",
                number: 1
            }
            request(app)
                .post('/api/folder')
                .set('Content-Type', 'application/json')
                .send(folder)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should not create new folder with duplicate value', (done) => {
            var folder = {
                name:  'المجلد الثالث',
                number: 1
            }
            request(app)
                .post('/api/folder')
                .set('Content-Type', 'application/json')
                .send(folder)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should not create new folder with name that have character less than 6', (done) => {
            var folder = {
                name:  'A',
                number: 3
            }
            request(app)
                .post('/api/folder')
                .set('Content-Type', 'application/json')
                .send(folder)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });
    });

    describe('GET /api/folders & view by Id', () => {
        it('should return all listed folders', (done) =>{
            request(app)
                .get('/api/folders')
                .expect(200)
                .expect((res) => {
                    expect(res.body.length).toBe(1);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should return folder info by ID', (done) =>{
            request(app)
                .get(`/api/folder/${folders[0]._id}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.name).toBe(folders[0].name);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });
    });

    describe('PATCH /api/folder/:id', () => {
        it('should update folder doc', (done) =>{
            var folder = {
                name:  'المجلد الخامس',
                number: 3
            }
            request(app)
                .patch(`/api/folder/${folders[0]._id}`)
                .send(folder)
                .expect(200)
                .expect((res) => {
                    expect(res.body.name).toBe(folder.name);
                    expect(res.body.number).toBe(folder.number);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should not update folder with empty name', (done) =>{
            var folder = {
                name:  '',
                number: 1
            }
            request(app)
                .patch(`/api/folder/${folders[0]._id}`)
                .send(folder)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

    });

    describe('DELETE /api/folder/:id', () => {
        it('should delete folder doc by id', (done) =>{

            request(app)
                .delete(`/api/folder/${folders[0]._id}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body._id).toBe(folders[0]._id.toHexString());
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should return 404 if the folder is not exists', (done) =>{

            request(app)
                .delete(`/api/folder/${new ObjectID()}`)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

    });

});


describe('Test Interpreter Routes <---------------------------', () => {
    describe('POST /api/interpreter', () =>{
        it('should create new interpreter', (done) => {
            var interpreter = {
                name: "Ayman User 3",
                type: "المقللون",
                rank: "100/200" ,
                dateDeath: "1618/08/11",
                numbersExplanation: 40,
                information: "هو اسمه ايمن الجوهري",
                timeline_id: new ObjectID(),
                symbol_id: new ObjectID()
            }

            request(app)
                .post('/api/interpreter')
                .set('Content-Type', 'application/json')
                .send(interpreter)
                .expect(200)
                .expect((res) => {
                    expect(res.body.name).toBe(interpreter.name);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    Interpreter.find(interpreter).then((doc) => {
                        expect(doc.length).toBe(1);
                        expect(doc[0].name).toBe(interpreter.name);
                        done();
                    }).catch((e) => done(e));
                });
        });

        it('should not create new interpreter with invalid data', 
        (done) => {
            var interpreter = {
                name: " ",
                type: "المقللون",
                rank: "100/200" ,
                dateDeath: "1618/08/11",
                numbersExplanation: 40,
                information: "هو اسمه ايمن الجوهري",
                timeline_id: "new ObjectID()",
                symbol_id: new ObjectID()
            }

            request(app)
                .post('/api/interpreter')
                .set('Content-Type', 'application/json')
                .send(interpreter)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });
    });

    describe('GET /api/interpreters & view by Id', () =>{
        it('should return all listed interpreters', (done) =>{
            request(app)
                .get('/api/interpreters')
                .expect(200)
                .expect((res) => {
                    expect(res.body.length).toBe(2);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should return interpreter info by id', (done) =>{
            request(app)
                .get(`/api/interpreter/${interpreters[0]._id}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.name).toBe(interpreters[0].name);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should return 404 if the interpreter is not exists', 
        (done) =>{
            request(app)
                .get(`/api/interpreter/${new ObjectID()}`)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

    });

    describe('PATCH /api/interpreter/:id', () =>{
        it('should update interpreter doc', (done) =>{
            var interpreter = {
                name: "Ayman User 3 xxxx",
                type: "المقللون xxxx",
                rank: "100/200 xxx" ,
                dateDeath: "1618/08/11",
                numbersExplanation: 40,
                information: "هو اسمه ايمن الجوهري",
                timeline_id: new ObjectID(),
                symbol_id: new ObjectID()
            }
            request(app)
                .patch(`/api/interpreter/${interpreters[0]._id}`)
                .send(interpreter)
                .expect(200)
                .expect((res) => {
                    expect(res.body.name).toBe(interpreter.name);
                    expect(res.body.type).toBe(interpreter.type);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should not update interpreter with invalid data', (done) =>{
            var interpreter = {
                name: " ",
                type: "المقللون xxxx",
                rank: "100/200 xxx" ,
                dateDeath: "1618/08/11",
                numbersExplanation: 40,
                information: "هو اسمه ايمن الجوهري",
                timeline_id: "new ObjectID()",
                symbol_id: new ObjectID()
            }
            request(app)
                .patch(`/api/interpreter/${interpreters[1]._id}`)
                .send(interpreter)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

    });

    describe('DELETE /api/interpreter/:id', () =>{
        it('should delete interpreter doc by id', (done) =>{

            request(app)
                .delete(`/api/interpreter/${interpreters[0]._id}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body._id).toBe(interpreters[0]._id.toHexString());
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should return 404 if the interpreter is not exists', (done) =>{

            request(app)
                .delete(`/api/interpreter/${new ObjectID()}`)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });
    });
});

describe("Test Resources Routes <---------------------------", () =>{
    describe("POST /api/resource", () =>{
        it("should create new resource", (done) =>{
            var resource = {
                name: "1 كتاب ابن كثير",
                information: "هو كتاب عن تفسير القرآن الكريم"
            };

            request(app)
                .post("/api/resource")
                .set('Content-Type', 'application/json')
                .send(resource)
                .expect(200)
                .expect((res) => {
                    expect(res.body.name).toBe(resource.name);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    Resource.find(resource).then((doc) => {
                        expect(doc[0].name).toBe(resource.name);
                        done();
                    }).catch((e) => done(e));
                });
        });

        it("should not create new resource with invalid data", (done) =>{
            var resource = {
                name: "   ",
                information: "ه"
            };

            request(app)
                .post("/api/resource")
                .set('Content-Type', 'application/json')
                .send(resource)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });
    });

    describe("GET /api/resources & view by Id", () =>{
        it('should return all listed resources', (done) =>{
            request(app)
                .get('/api/resources')
                .expect(200)
                .expect((res) => {
                    expect(res.body.length).toBe(2);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should return resource info by id', (done) =>{
            request(app)
                .get(`/api/resource/${resources[0]._id}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.name).toBe(resources[0].name);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should return 404 if the resource is not exists', 
        (done) =>{
            request(app)
                .get(`/api/resource/${new ObjectID()}`)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });
    });

    describe('PATCH /api/resource/:id', () =>{
        it('should update resource doc', (done) =>{
            var resource = {
                name: "XXXXX كتاب ابن كثير",
                information: "XXXX هو كتاب عن تفسير القرآن الكريم"
            }
            request(app)
                .patch(`/api/resource/${resources[0]._id}`)
                .send(resource)
                .expect(200)
                .expect((res) => {
                    expect(res.body.name).toBe(resource.name);
                    expect(res.body.information).toBe(resource.information);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should not update resource with invalid data', (done) =>{
            var resource = {
                name: "   ",
                information: "ه"
            };

            request(app)
                .patch(`/api/resource/${resources[1]._id}`)
                .send(resource)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });
    });

    describe('DELETE /api/resource/:id', () =>{
        it('should delete resource doc by id', (done) =>{

            request(app)
                .delete(`/api/resource/${resources[0]._id}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body._id).toBe(resources[0]._id.toHexString());
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should return 404 if the resource is not exists', (done) =>{

            request(app)
                .delete(`/api/resource/${new ObjectID()}`)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });
    });
});

describe("Test Annotation Routes <---------------------------", () =>{
    describe("POST /api/annotation", () =>{
        it("should create new annotation", (done) =>{
            var annotationt = {
                body: "حاشية لتفسير جزئ او كلمة من موضوع xxx",
            };

            request(app)
                .post("/api/annotation")
                .set('Content-Type', 'application/json')
                .send(annotationt)
                .expect(200)
                .expect((res) => {
                    expect(res.body.body).toBe(annotationt.body);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    Annotation.find(annotationt).then((doc) => {
                        expect(doc[0].body).toBe(annotationt.body);
                        done();
                    }).catch((e) => done(e));
                });
        });

        it("should not create new annotation with invalid data", (done) =>{
            var annotationt = {
                body: "ع",
            };

            request(app)
                .post("/api/annotation")
                .set('Content-Type', 'application/json')
                .send(annotationt)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });
    });

    describe("GET /api/annotation & view by Id", () =>{
        it('should return all listed annotation', (done) =>{
            request(app)
                .get('/api/annotation')
                .expect(200)
                .expect((res) => {
                    expect(res.body.length).toBe(2);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should return annotation info by id', (done) =>{
            request(app)
                .get(`/api/annotation/${annotation[0]._id}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.body).toBe(annotation[0].body);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should return 404 if the annotation is not exists', 
        (done) =>{
            request(app)
                .get(`/api/annotation/${new ObjectID()}`)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });
    });

    describe('PATCH /api/annotation/:id', () =>{
        it('should update annotation doc', (done) =>{
            var annotationt = {
                body: "xxxxx حاشية لتفسير جزئ او كلمة من موضوع",
            };
            request(app)
                .patch(`/api/annotation/${annotation[0]._id}`)
                .send(annotationt)
                .expect(200)
                .expect((res) => {
                    expect(res.body.body).toBe(annotationt.body);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should not update annotation with invalid data', (done) =>{
            var annotationt = {
                body: " ",
            };

            request(app)
                .patch(`/api/annotation/${annotation[1]._id}`)
                .send(annotationt)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });
    });

    describe('DELETE /api/annotation/:id', () =>{
        it('should delete annotation doc by id', (done) =>{

            request(app)
                .delete(`/api/annotation/${annotation[0]._id}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body._id).toBe(annotation[0]._id.toHexString());
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should return 404 if the annotation is not exists', (done) =>{

            request(app)
                .delete(`/api/annotation/${new ObjectID()}`)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });
    });
});

describe("Test Topics Routes <---------------------------", () =>{
    describe("POST /api/topic", () =>{
        it("should create new topic", (done) =>{
            var topic = {
                folder_id: folders[0]._id,
                pageNumber: 110,
                headline: "الموضوع الاول من الكتاب",
                body: "هو كتاب اين كثير (١/٧٧) حاشية"
            };

            request(app)
                .post("/api/topic")
                .set('Content-Type', 'application/json')
                .send(topic)
                .expect(200)
                .expect((res) => {
                    expect(res.body.body).toBe(topic.body);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    Topic.find(topic).then((doc) => {
                        expect(doc[0].body).toBe(topic.body);
                        done();
                    }).catch((e) => done(e));
                });
        });

        it("should not create new topic with invalid data", (done) =>{
            var topic = {
                folder_id: folders[0]._id,
                pageNumber: 110,
                headline: " ب",
                body: " "
            };

            request(app)
                .post("/api/topic")
                .set('Content-Type', 'application/json')
                .send(topic)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });
    });

    describe("GET /api/topics & view by Id", () =>{
        it('should return all listed topics', (done) =>{
            request(app)
                .get('/api/topics')
                .expect(200)
                .expect((res) => {
                    expect(res.body.length).toBe(3);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should return topic info by id', (done) =>{
            request(app)
                .get(`/api/topic/${topics[1]._id}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.doc.body).toBe(topics[1].body);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it(`should return annotation_docs equal \n\t to empty if the topic have no annotation`, (done) =>{
            request(app)
                .get(`/api/topic/${topics[2]._id}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.annotation_docs).toBe("empty");
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should return 404 if the topic is not exists', 
        (done) =>{
            request(app)
                .get(`/api/topic/${new ObjectID()}`)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });
    });

    describe('PATCH /api/topic/:id', () =>{
        it('should update topic doc', (done) =>{
            var topic = {
                headline: "xx xxx xxxx xxxx xxxx",
                body: "xx xxx xxxx xxxx xxxx"
            };

            request(app)
                .patch(`/api/topic/${topics[0]._id}`)
                .send(topic)
                .expect(200)
                .expect((res) => {
                    expect(res.body.body).toBe(topic.body);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should not update topic with invalid data', (done) =>{
            var topic = {
                headline: " ",
                body: "x"
            };

            request(app)
                .patch(`/api/topic/${topics[1]._id}`)
                .send(topic)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });
    });

    describe('DELETE /api/topic/:id', () =>{
        it('should delete topic doc by id', (done) =>{

            request(app)
                .delete(`/api/topic/${topics[0]._id}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body._id).toBe(topics[0]._id.toHexString());
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });

        it('should return 404 if the topic is not exists', (done) =>{

            request(app)
                .delete(`/api/topic/${new ObjectID()}`)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done(err);
                });
        });
    });
});