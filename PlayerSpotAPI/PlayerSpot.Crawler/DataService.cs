using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Newtonsoft.Json;
using PlayerSpot.LoL.ApiServices.Models;
using PlayerSpot.Twitchtv.ApiServices.Models;
using PlayerSpotAPI.Helpers;

namespace PlayerSpot.Crawler
{
    public class DataService
    {
        private IMongoCollection<KeyValuePair<string,Stream>> streamCollection;
        private IMongoCollection<BsonDocument> streamKnowCollection;
        private MongoClient client;
        private IMongoDatabase dataBase;

        public DataService(string connectionString = "mongodb://localhost")
        {
            client = new MongoClient(connectionString);
            dataBase = client.GetDatabase("CrawlerDataBase");
            streamCollection = dataBase.GetCollection<KeyValuePair<string, Stream>>("Streams");
            streamKnowCollection = dataBase.GetCollection<BsonDocument>("KnowStreams");
        }

        public void SaveStream(Stream stream)
        {
            var data = new KeyValuePair<string, Stream>(DateTime.Now.ToShortDateString(),stream);
            
            streamCollection.InsertOne(data);
        }

        public void SaveStreams(IEnumerable<Stream> streams)
        {
            List<KeyValuePair<string, Stream>> list = new List<KeyValuePair<string, Stream>>();
            var time = DateTime.Now.ToShortDateString();
            foreach (var stream in streams)
            {
                list.Add(new KeyValuePair<string, Stream>(time,stream));
            }
            streamCollection.InsertMany(list);
        }

        public void SaveKnowStream(Stream stream, List<RawMatch> rawMatches)
        {
            
            var o = new List<object>(){stream, rawMatches, DateTime.Now.ToShortDateString()};
            var obj = ResponseHelpers.AddJsonWrapper(new[] {"stream", "rawMatches", "date"}, o);
            var document = BsonSerializer.Deserialize<BsonDocument>(JsonConvert.SerializeObject(obj));
            streamKnowCollection.InsertOne(document);   
        }
    }
}
