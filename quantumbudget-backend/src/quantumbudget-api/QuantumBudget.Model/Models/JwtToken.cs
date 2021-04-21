using System;
using System.Collections.Generic;
using System.Text;

namespace QuantumBudget.Model.Models
{
    public class JwtToken
    {
        public string UserId { get; set; }

        public string AccessToken { get; set; }
    }
}
