using System;
using Newtonsoft.Json;

namespace QuantumBudget.Model.DTOs.Auth0
{
    public class UserAppMetadataWriteSubscriptionInfoDto
    {
        [JsonProperty("subscriptionPlan")]
        public string SubscriptionPlan { get; set; }
        
        [JsonProperty("subscriptionExpires")]
        public DateTimeOffset SubscriptionExpires { get; set; }
    }

    public static class SubscriptionPlan
    {
        public static string Free = "free";
        public static string Basic = "basic";
        public static string Premium = "premium";
        public static string Pro = "pro";
    }
}