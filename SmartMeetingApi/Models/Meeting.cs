
using System;
using System.Collections.Generic;

namespace SmartMeetingApi.Models
{
    public class Meeting
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public List<Participant> Participants { get; set; } = new List<Participant>();
        public string Location { get; set; }
        public List<object> Agenda { get; set; } = new List<object>();
        public string Notes { get; set; }
        public List<object> ActionItems { get; set; } = new List<object>();
    }

    public class Participant
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
