using BlazingChatGPT;
using BlazingChatGPT.Services;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// Load configuration
var config = builder.Configuration;
var apiBaseUrl = config["ChatGPT:BaseUrl"];
var apiKey = config["ChatGPT:ApiKey"];

if (string.IsNullOrEmpty(apiBaseUrl) || string.IsNullOrEmpty(apiKey))
{
    throw new InvalidOperationException("API BaseUrl or ApiKey is missing in the configuration.");
}

// Register the service
builder.Services.AddScoped<ChatGPTService>(sp => new ChatGPTService(apiBaseUrl, apiKey));

await builder.Build().RunAsync();


//builder.services.addsingleton<chatgptservice>(cp =>
//{
//    var config = cp.getrequiredservice<iconfiguration>();
//    var apiurl = config.getvalue<string>("chatgptsettings:apiurl");
//    var apikey = config.getvalue<string>("chatgptsettings:apikey");
//    return new chatgptservice(apiurl, apikey);
//});