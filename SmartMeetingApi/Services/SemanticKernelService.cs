
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Text;
using SmartMeetingApi.Models;

namespace SmartMeetingApi.Services
{
    public class SemanticKernelService
    {
        private readonly ILogger<SemanticKernelService> _logger;
        private readonly IConfiguration _configuration;
        private readonly Kernel _kernel;

        public SemanticKernelService(ILogger<SemanticKernelService> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            
            // Initialize Semantic Kernel with Azure OpenAI
            var builder = Kernel.CreateBuilder();
            
            // Add Azure OpenAI service
            builder.AddAzureOpenAIChatCompletion(
                _configuration["SemanticKernel:DeploymentName"],
                _configuration["SemanticKernel:Endpoint"],
                _configuration["SemanticKernel:ApiKey"]
            );
            
            _kernel = builder.Build();
        }

        public async Task<IEnumerable<AgendaItem>> GenerateAgendaAsync(Meeting meeting)
        {
            try
            {
                _logger.LogInformation("Using Semantic Kernel to generate agenda");
                
                // Create the prompt template for agenda generation
                var promptTemplate = _configuration["Prompts:AgendaGeneration"];
                
                // Format meeting data for the prompt
                var meetingJson = JsonSerializer.Serialize(meeting);
                
                // Create the prompt function
                var agendaFunction = _kernel.CreateFunctionFromPrompt(promptTemplate);
                
                // Execute the function
                var result = await _kernel.InvokeAsync(agendaFunction, new KernelArguments
                {
                    ["meeting"] = meetingJson
                });
                
                var generatedText = result.GetValue<string>();
                _logger.LogInformation("Generated agenda text: {Text}", generatedText);
                
                // Parse the generated text into agenda items
                var agendaItems = ParseAgendaItems(generatedText, meeting);
                
                return agendaItems;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GenerateAgendaAsync");
                throw;
            }
        }

        private IEnumerable<AgendaItem> ParseAgendaItems(string generatedText, Meeting meeting)
        {
            // In a real implementation, you would use a more robust parsing approach
            // This is a simplified version for demonstration purposes
            
            var lines = TextChunker.SplitPlainTextLines(generatedText, 100);
            var agendaItems = new List<AgendaItem>();
            var currentId = 1;
            
            foreach (var line in lines)
            {
                var trimmedLine = line.Trim();
                if (string.IsNullOrEmpty(trimmedLine) || !trimmedLine.Contains(':'))
                    continue;
                
                var parts = trimmedLine.Split(':', 2);
                if (parts.Length < 2)
                    continue;
                
                var title = parts[0].Trim();
                var details = parts[1].Trim();
                
                // Try to extract duration and presenter information
                string duration = "15min"; // Default
                string presenter = meeting.Participants.Count > 0 ? meeting.Participants[0].Name : "Lead";
                string description = details;
                
                // Look for duration pattern like (15min)
                var durationMatch = System.Text.RegularExpressions.Regex.Match(details, @"\((\d+\s*min)\)");
                if (durationMatch.Success)
                {
                    duration = durationMatch.Groups[1].Value;
                    description = description.Replace(durationMatch.Value, "").Trim();
                }
                
                // Look for presenter pattern like [Name]
                var presenterMatch = System.Text.RegularExpressions.Regex.Match(details, @"\[(.*?)\]");
                if (presenterMatch.Success)
                {
                    presenter = presenterMatch.Groups[1].Value;
                    description = description.Replace(presenterMatch.Value, "").Trim();
                }
                
                agendaItems.Add(new AgendaItem
                {
                    Id = $"agenda-{DateTime.Now.Ticks}-{currentId++}",
                    Title = title,
                    Duration = duration,
                    Presenter = presenter,
                    Description = description
                });
            }
            
            return agendaItems;
        }
    }
}
