using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Mailchimp;
using QuantumBudget.Repositories;

namespace Functions.API.Tests.Repositories
{
    public class FakeMailchimpRepository : IMailchimpRepository
    {
        private readonly Dictionary<string, List<MemberDto>> _members;

        public Dictionary<string, List<MemberDto>> Members => _members;

        public FakeMailchimpRepository()
        {
            _members = new Dictionary<string, List<MemberDto>>()
            {
                {
                    "existing@example.org", new List<MemberDto>()
                    {
                        new MemberDto()
                        {
                            Id = "9ebeb3a9-7663-42ee-a65a-d0ae8c10f833",
                            Status = "subscribed",
                            Tags = null,
                            EmailAddress = "existing@example.org"
                        }
                    }
                },
                {
                    "archived@example.org", new List<MemberDto>()
                    {
                        new MemberDto()
                        {
                            Id = "96c5b7a3-0932-4dfe-881a-e957820b0797",
                            Status = "archived",
                            Tags = null,
                            EmailAddress = "archived@example.org",
                        }
                    }
                },
                {
                    "pending@example.org", new List<MemberDto>()
                    {
                        new MemberDto()
                        {
                            Id = "1c726f3b-d2ec-4e73-bb22-d95cde89edba",
                            Status = "pending",
                            Tags = null,
                            EmailAddress = "pending@example.org",
                        }
                    }
                },
                {
                    "unsubscribed@example.org", new List<MemberDto>()
                    {
                        new MemberDto()
                        {
                            Id = "4dc5067d-53b3-4d2e-9fb0-8a65875ccee0",
                            Status = "unsubscribed",
                            Tags =  null,
                            EmailAddress = "unsubscribed@example.org",

                        }
                    }
                },
                {
                    "subscribed@example.org", new List<MemberDto>()
                    {
                        new MemberDto()
                        {
                            Id = "177985be-bf2b-4d26-bd31-03afc25912b6",
                            Status = "subscribed",
                            Tags =  null,
                            EmailAddress = "subscribed@example.org",

                        }
                    }
                }
            };
        }

        public async Task AddMemberAsync(NewSubscriberDto newSubscriber)
        {
            var memberExists = _members.TryGetValue(newSubscriber.Email, out var member);

            if (memberExists)
            {
                member.Add(new MemberDto()
                {
                    Id = Guid.NewGuid().ToString(),
                    Status = "pending",
                    EmailAddress = newSubscriber.Email,
                    Tags = new List<TagDto>()
                    {
                        new TagDto()
                        {
                            Name = newSubscriber.Source
                        }
                    }
                });
            }
            else
            {
                _members.Add(newSubscriber.Email, new List<MemberDto>()
                {
                    new MemberDto()
                    {
                        Id = Guid.NewGuid().ToString(),
                        Status = "pending",
                        EmailAddress = newSubscriber.Email,
                        Tags = new List<TagDto>()
                        {
                            new TagDto()
                            {
                                Name = newSubscriber.Source
                            }
                        }
                    }
                });
            }
        }

        public async Task<MemberDto> GetMemberAsync(string email)
        {
            var memberExists = _members.TryGetValue(email, out var member);

            if (memberExists)
            {
                return member.LastOrDefault();
            }

            return null;
        }

        public async Task UpdateMemberAsync(string email, MemberDto updatedMember)
        {
            var memberExists = _members.TryGetValue(email, out var member);

            if (memberExists)
            {
                member.Add(new MemberDto()
                {
                    Status = updatedMember.Status ?? member.FirstOrDefault()?.Status,
                    Tags = updatedMember.Tags ?? member.FirstOrDefault()?.Tags,
                    EmailAddress = updatedMember.EmailAddress ?? member.FirstOrDefault()?.EmailAddress
                });
            }
        }
    }
}