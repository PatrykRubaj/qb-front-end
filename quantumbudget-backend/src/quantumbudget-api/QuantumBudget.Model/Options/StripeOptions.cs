using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuantumBudget.Model.Options
{
    public class StripeOptions
    {
        public const string Stripe = "Stripe";

        public string Domain { get; set; }
        public string PublicKey { get; set; }
        public string SecretKey { get; set; }
        public string WebhookSecret { get; set; }
    }
}
