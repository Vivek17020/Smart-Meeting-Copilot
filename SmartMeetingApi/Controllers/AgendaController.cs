
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.SemanticKernel;
using SmartMeetingApi.Models;
using SmartMeetingApi.Services;

namespace SmartMeetingApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgendaController : ControllerBase
    {
        private readonly ILogger<AgendaController> _logger;
        private readonly SemanticKernelService _semanticKernelService;

        public AgendaController(ILogger<AgendaController> logger, SemanticKernelService semanticKernelService)
        {
            _logger = logger;
            _semanticKernelService = semanticKernelService;
        }

        [HttpPost("generate")]
        public async Task<ActionResult<IEnumerable<AgendaItem>>> GenerateAgenda([FromBody] Meeting meeting)
        {
            try
            {
                _logger.LogInformation("Generating agenda for meeting: {MeetingTitle}", meeting.Title);
                
                var agenda = await _semanticKernelService.GenerateAgendaAsync(meeting);
                
                return Ok(agenda);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating agenda");
                return StatusCode(500, "An error occurred while generating the agenda");
            }
        }

        [HttpGet("status")]
        public ActionResult GetStatus()
        {
            return Ok(new { status = "available", version = "1.0" });
        }
    }
}
