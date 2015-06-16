// The missing JSON from allmyphrasalverbs.com
// allPhrasals -> usage for dictionary
// and
// JSON.parse(resultJSON) -> usage for module

var allPhrasals = [
    {
        en: 'abide by',
        description: 'Accept or follow a decision or rule.'
    },
    {
        en: 'account for',
        description: 'To explain.'
    },
    {
        en: 'ache for',
        description: 'Want something or someone a lot.'
    },
    {
        en: 'act on',
        description: 'To take action because of something like information received.'
    },
    {
        en: 'act on',
        description: 'Affect.'
    },
    {
        en: 'act out',
        description: 'Perform something with actions and gestures..'
    },
    {
        en: 'act out',
        description: 'Express an emotion in your behaviour.'
    },
    {
        en: 'act up',
        description: 'Behave badly or strangely.'
    },
    {
        en: 'act upon',
        description: 'To take action because of something like information received.'
    },
    {
        en: 'act upon',
        description: 'Affect.'
    },
    {
        en: 'add on',
        description: 'Include in a calculation.'
    },
    {
        en: 'add up',
        description: 'To make a mathematical total.'
    },
    {
        en: 'add up',
        description: 'Be a satisfactory explanantion for something.'
    },
    {
        en: 'add up to',
        description: 'Have a certain result.'
    },
    {
        en: 'add up to',
        description: 'Come to a certain amount or figure.'
    },
    {
        en: 'agree with',
        description: 'Affect- usually used in the negative to show that something has had a negative effect, especially is it makes you feel bad.'
    },
    {
        en: 'aim at',
        description: 'To target.'
    },
    {
        en: 'aim at',
        description: 'Intend to achieve.'
    },
    {
        en: 'allow for',
        description: 'Include something in a plan or calculation.'
    },
    {
        en: 'allow of',
        description: 'Make possible, permit.'
    },
    {
        en: 'angle for',
        description: 'Try to get something indirectly, by hinting or suggesting.'
    },
    {
        en: 'answer back',
        description: 'To reply rudely to someone in authority.'
    },
    {
        en: 'answer for',
        description: 'Be held responsible for a problem.'
    },
    {
        en: 'answer for',
        description: 'Speak on behalf of someone or from knowing them.'
    },
    {
        en: 'argue down',
        description: 'Beat someone in a debate, discussion or argument.'
    },
    {
        en: 'argue down',
        description: 'Persuade someone to drop the price of something they\'re selling.'
    },
    {
        en: 'argue down',
        description: 'Try to persuade people not to accept a proposition, motion, etc.'
    },
    {
        en: 'argue out',
        description: 'Argue about a problem to find a solution.'
    },
    {
        en: 'ask about',
        description: 'Ask how someone is doing, especially professionally and in terms of health.'
    },
    {
        en: 'ask after',
        description: 'Enquire about someone\'s health, how life is going.'
    },
    {
        en: 'ask around',
        description: 'Ask a number of people for information of help.'
    },
    {
        en: 'ask around',
        description: 'Invite someone.'
    },
    {
        en: 'ask for',
        description: 'To provoke a negative reaction.'
    },
    {
        en: 'ask for',
        description: 'Request to have or be given.'
    },
    {
        en: 'ask in',
        description: 'To invite somebody into your house.'
    },
    {
        en: 'ask out',
        description: 'To invite someone for a date.'
    },
    {
        en: 'ask over',
        description: 'Invite.'
    },
    {
        en: 'ask round',
        description: 'Invite someone.'
    },
    {
        en: 'auction off',
        description: 'Sell something in an auction.'
    },
    {
        en: 'back away',
        description: 'Retreat or go backwards.'
    },
    {
        en: 'back down',
        description: 'Retract or withdraw your position or proposal in an argument.'
    },
    {
        en: 'back into',
        description: 'Enter a parking area in reverse gear.'
    },
    {
        en: 'back off',
        description: 'Retreat.'
    },
    {
        en: 'back out',
        description: 'Fail to keep an arrangement or promise.'
    },
    {
        en: 'back out of',
        description: 'Fail to keep an agreement, arrangement.'
    },
    {
        en: 'back out of',
        description: 'Exit a parking area in reverse gear.'
    },
    {
        en: 'back up',
        description: 'Make a copy of computer data.'
    },
    {
        en: 'back up',
        description: 'Support.'
    },
    {
        en: 'back up',
        description: 'Drive a vehicle backwards.'
    },
    {
        en: 'bag out',
        description: 'Criticise.'
    },
    {
        en: 'bail out',
        description: 'Save, rescue.'
    },
    {
        en: 'bail out',
        description: 'Remove water from something that is flooded.'
    },
    {
        en: 'bail out',
        description: 'Jump out of a plane because it is going to crash.'
    },
    {
        en: 'bail out of',
        description: 'Pay a bond to release someone from jail.'
    },
    {
        en: 'bail out on',
        description: 'Stop supporting someone when they are in trouble.'
    },
    {
        en: 'bail up',
        description: 'Talk to someone and delay them.'
    },
    {
        en: 'bail up',
        description: 'Rob someone at gunpoint.'
    },
    {
        en: 'ball up',
        description: 'Confuse or make things complicated.'
    },
    {
        en: 'ball up',
        description: 'Roll or form into a round shape.'
    },
    {
        en: 'balls up',
        description: 'Spoil, ruin.'
    },
    {
        en: 'bang about',
        description: 'Move in a place making a lot of noise.'
    },
    {
        en: 'bang around',
        description: 'Move in a place making a lot of noise.'
    },
    {
        en: 'bang on',
        description: 'Talk at great length.'
    },
    {
        en: 'bang on about',
        description: 'Keep talking about something.'
    },
    {
        en: 'bang out',
        description: 'Play a musical instrument loudly.'
    },
    {
        en: 'bang up',
        description: 'Put someone in prison.'
    },
    {
        en: 'bang up',
        description: 'Damage badly.'
    },
    {
        en: 'bank on',
        description: 'Count or rely on.'
    },
    {
        en: 'bargain down',
        description: 'Persuade someone to drop the price of something they\'re selling.'
    },
    {
        en: 'bargain for',
        description: 'Expect something to happen (usually negative).'
    },
    {
        en: 'bargain on',
        description: 'Expect something to happen (usually negative).'
    },
    {
        en: 'barge in',
        description: 'Enter a place and interrupt.'
    },
    {
        en: 'barge into',
        description: 'Enter a place and interrupt people rudely.'
    },
    {
        en: 'bash about',
        description: 'Mistreat physically.'
    },
    {
        en: 'bash in',
        description: 'Break, damage or injure by hitting.'
    },
    {
        en: 'bash out',
        description: 'Write something quickly without much preparation.'
    },
    {
        en: 'bash up',
        description: 'Break, damage or hurt by hitting.'
    },
    {
        en: 'bawl out',
        description: 'Scold, shout at someone.'
    },
    {
        en: 'bawl out',
        description: 'Scold.'
    },
    {
        en: 'bawl out',
        description: 'Sing or shout unpleasantly loudly.'
    },
    {
        en: 'be after',
        description: 'Try to find or get.'
    },
    {
        en: 'be along',
        description: 'Arrive.'
    },
    {
        en: 'be away',
        description: 'Be elsewhere; on holiday, etc..'
    },
    {
        en: 'be cut out for',
        description: 'Be suitable, have the necessary qualities.'
    },
    {
        en: 'be cut up',
        description: 'Be upset.'
    },
    {
        en: 'be down',
        description: 'Be depressed.'
    },
    {
        en: 'be down',
        description: 'Be reduced or less.'
    },
    {
        en: 'be down on',
        description: 'Have negative feelings toward someone.'
    },
    {
        en: 'be down with',
        description: 'Be ill.'
    },
    {
        en: 'be fed up',
        description: 'Be bored, upset or sick of something.'
    },
    {
        en: 'be in',
        description: 'Be at home or at work.'
    },
    {
        en: 'be in',
        description: 'Be submitted, arrive.'
    },
    {
        en: 'be in on',
        description: 'Be involved in.'
    },
    {
        en: 'be not on',
        description: 'Be unacceptable.'
    },
    {
        en: 'be off',
        description: 'Be bad (of food).'
    },
    {
        en: 'be off',
        description: 'Depart, leave.'
    },
    {
        en: 'be on',
        description: 'Be functioning (of machines).'
    },
    {
        en: 'be on',
        description: 'Take place.'
    },
    {
        en: 'be on',
        description: 'Take medication or dr*gs, especially when they affect the person badly.'
    },
    {
        en: 'be on',
        description: 'Be at the top of ones game, performing very well.'
    },
    {
        en: 'be on about',
        description: 'Mean, try to say.'
    },
    {
        en: 'be onto',
        description: 'Pursue, be aware of someone\'s true nature.'
    },
    {
        en: 'be out',
        description: 'Be absent from a place.'
    },
    {
        en: 'be out of',
        description: 'Have no more left.'
    },
    {
        en: 'be out to',
        description: 'Attempt.'
    },
    {
        en: 'be snowed under',
        description: 'Have too much work.'
    },
    {
        en: 'be taken aback',
        description: 'Be shocked or surprised.'
    },
    {
        en: 'be taken with',
        description: 'Like something.'
    },
    {
        en: 'be up',
        description: 'Be out of bed.'
    },
    {
        en: 'be up',
        description: 'Have increased or risen.'
    },
    {
        en: 'be up',
        description: 'When the time for something finishes or expires.'
    },
    {
        en: 'be up for',
        description: 'Be enthusiastic about an upcoming event.'
    },
    {
        en: 'be up to',
        description: 'Be good enough.'
    },
    {
        en: 'be up to',
        description: 'Doing something naughty or wrong.'
    },
    {
        en: 'bear down on',
        description: 'Move towards.'
    },
    {
        en: 'bear on',
        description: 'Influence, affect.'
    },
    {
        en: 'bear out',
        description: 'Confirm that something is correct.'
    },
    {
        en: 'bear up',
        description: 'Resist pressure.'
    },
    {
        en: 'bear up under',
        description: 'Cope with something difficult or stressful.'
    },
    {
        en: 'bear with',
        description: 'Be patient.'
    },
    {
        en: 'beat down',
        description: 'Strong sunshine.'
    },
    {
        en: 'beat down',
        description: 'Get someone to lower the price of something.'
    },
    {
        en: 'beat out',
        description: 'Narrowly win in competition.'
    },
    {
        en: 'beat up',
        description: 'Attack violently.'
    },
    {
        en: 'beaver away',
        description: 'Work hard.'
    },
    {
        en: 'beaver away at',
        description: 'Work hard doing something.'
    },
    {
        en: 'bed down',
        description: 'Sleep somewhere less comfortable than normal.'
    },
    {
        en: 'bed down',
        description: 'Become established or successful over time.'
    },
    {
        en: 'bed out',
        description: 'Move a plant outside.'
    },
    {
        en: 'beef up',
        description: 'Make something stronger or more solid.'
    },
    {
        en: 'belong to',
        description: 'Be a member.'
    },
    {
        en: 'belong to',
        description: 'Be connected to a time, place, belief, thing,  etc.'
    },
    {
        en: 'belong with',
        description: 'Be in the correct or appropriate location with other items.'
    },
    {
        en: 'belt out',
        description: 'Sing something loudly.'
    },
    {
        en: 'belt up',
        description: 'Be quiet.'
    },
    {
        en: 'belt up',
        description: 'Fasten your seatbelt.'
    },
    {
        en: 'bend down',
        description: 'Lower the top half of your body.'
    },
    {
        en: 'bend over',
        description: 'Lower the top part of your body.'
    },
    {
        en: 'bend over backwards',
        description: 'Do a lot to try to help or please someone.'
    },
    {
        en: 'big up',
        description: 'Exaggerate the importance.'
    },
    {
        en: 'big up',
        description: 'Increase the size of muscles by exercise.'
    },
    {
        en: 'bitch up',
        description: 'Spoil or ruin something.'
    },
    {
        en: 'black out',
        description: 'Fall unconscious.'
    },
    {
        en: 'black out',
        description: 'Lose light.'
    },
    {
        en: 'blank out',
        description: 'Censor text so that words cannot be read.'
    },
    {
        en: 'blank out',
        description: 'Have a temporary memory failure.'
    },
    {
        en: 'blare out',
        description: 'A loud sound or music.'
    },
    {
        en: 'blast off',
        description: 'Leave the ground- spaceship or rocket.'
    },
    {
        en: 'blaze away',
        description: 'Fire a gun repeatedly.'
    },
    {
        en: 'bleed out',
        description: 'Cause sufficient blood loss to result in death.'
    },
    {
        en: 'bliss out',
        description: 'Be extremely relaxed and happy.'
    },
    {
        en: 'block in',
        description: 'Park a car and obstruct another car.'
    },
    {
        en: 'block in',
        description: 'Shade or fill in.'
    },
    {
        en: 'block off',
        description: 'Obstruct an exit to prevent people from leaving.'
    },
    {
        en: 'block out',
        description: 'Stop light from entering or leaving.'
    },
    {
        en: 'block out',
        description: 'Try not think about or feel something because it is upsetting or painful.'
    },
    {
        en: 'block up',
        description: 'Fill a space so that nothing can pass.'
    },
    {
        en: 'blow away',
        description: 'Kill.'
    },
    {
        en: 'blow away',
        description: 'Beat rivals or competitors by a large margin.'
    },
    {
        en: 'blow away',
        description: 'Impress greatly.'
    },
    {
        en: 'blow away',
        description: 'When the wind moves something from a place.'
    },
    {
        en: 'blow down',
        description: 'When the wind forces something to fall.'
    },
    {
        en: 'blow in',
        description: 'Arrive, sometimes suddenly or unexpectedly.'
    },
    {
        en: 'blow off',
        description: 'Not keep an appointment.'
    },
    {
        en: 'blow off',
        description: 'Ignore, not do something.'
    },
    {
        en: 'blow off',
        description: 'Expel gas from the anus.'
    },
    {
        en: 'blow out',
        description: 'Extinguish candles, matches, etc..'
    },
    {
        en: 'blow out',
        description: 'Defeat decisively.'
    },
    {
        en: 'blow over',
        description: 'When a scandal gets forgotten.'
    },
    {
        en: 'blow up',
        description: 'Explode.'
    },
    {
        en: 'blow up',
        description: 'Inflate.'
    },
    {
        en: 'blow up',
        description: 'Enlarge (e.g., photograph)..'
    },
    {
        en: 'blow up',
        description: 'The beginning of a storm.'
    },
    {
        en: 'blow up',
        description: 'Lose your temper, become angry.'
    },
    {
        en: 'blurt out',
        description: 'Say something quickly without thinking, especially if you shouldn\'t.'
    },
    {
        en: 'board out',
        description: 'Arrange for pets to  stay somewhere while you\'re away.'
    },
    {
        en: 'board up',
        description: 'Cover windows or doors with wood, metal, etc..'
    },
    {
        en: 'bog down',
        description: 'Slow make progress.'
    },
    {
        en: 'bog in',
        description: 'Eat enthusiastically.'
    },
    {
        en: 'bog into',
        description: 'Eat something enthusiastically.'
    },
    {
        en: 'bog off!',
        description: 'Get lost.'
    },
    {
        en: 'boil down',
        description: 'Simplify, reduce to the essentials.'
    },
    {
        en: 'boil down to',
        description: 'Amount to.'
    },
    {
        en: 'boil over',
        description: 'When a hot liquid spills out of a container.'
    },
    {
        en: 'boil over',
        description: 'When people lose their tempers and things get nasty.'
    },
    {
        en: 'boil up',
        description: 'Feel a negative emotion strongly.'
    },
    {
        en: 'boil up',
        description: 'Cook or heat something to boiling point.'
    },
    {
        en: 'bolster up',
        description: 'Give support, reinforce, strengthen.'
    },
    {
        en: 'bone up',
        description: 'Study hard for a reason.'
    },
    {
        en: 'bone up on',
        description: 'Study hard for a goal or reason.'
    },
    {
        en: 'book in',
        description: 'Make a reservation in advance.'
    },
    {
        en: 'book in',
        description: 'Check in at a hotel.'
    },
    {
        en: 'book into',
        description: 'Make a reservation in advance.'
    },
    {
        en: 'book into',
        description: 'Check in at a hotel.'
    },
    {
        en: 'book out',
        description: 'Leave a place in a hurry.'
    },
    {
        en: 'book up',
        description: 'Reserve.'
    },
    {
        en: 'boot up',
        description: 'Start a computer.'
    },
    {
        en: 'border on',
        description: 'Be located next to a place.'
    },
    {
        en: 'border on',
        description: 'Be very nearly something.'
    },
    {
        en: 'boss about',
        description: 'Use excessive authority to control people.'
    },
    {
        en: 'boss around',
        description: 'Use excessive authority to control people.'
    },
    {
        en: 'botch up',
        description: 'Ruin or spoil something.'
    },
    {
        en: 'bottle away',
        description: 'Store up.'
    },
    {
        en: 'bottle out',
        description: 'Lack courage to do something.'
    },
    {
        en: 'bottle up',
        description: 'Not express your feelings.'
    },
    {
        en: 'bottom out',
        description: 'Pass the lowest point and start rising.'
    },
    {
        en: 'bounce  into',
        description: 'Force someone.'
    },
    {
        en: 'bounce back',
        description: 'Recover.'
    },
    {
        en: 'bounce off',
        description: 'Test ideas.'
    },
    {
        en: 'bowl out',
        description: 'Hit someone\'s wicket in cricket with the ball.'
    },
    {
        en: 'bowl over',
        description: 'Surprise someone greatly.'
    },
    {
        en: 'bowl over',
        description: 'Knock someone to the ground.'
    },
    {
        en: 'box in',
        description: 'Prevent something from moving, especially vehicles.'
    },
    {
        en: 'box up',
        description: 'Pack things in boxes to move them.'
    },
    {
        en: 'brace up',
        description: 'Feel  more confident or optimistic about something.'
    },
    {
        en: 'branch out',
        description: 'Move into a different area of business, etc..'
    },
    {
        en: 'break away',
        description: 'Leave an organisation, usually to form a new one.'
    },
    {
        en: 'break down',
        description: 'End negotiations unsuccessfully.'
    },
    {
        en: 'break down',
        description: 'Start crying.'
    },
    {
        en: 'break down',
        description: 'Stop working.'
    },
    {
        en: 'break down',
        description: 'Remove a barrier or obstacle.'
    },
    {
        en: 'break in',
        description: 'Go into a building to steal something.'
    },
    {
        en: 'break in',
        description: 'Interrupt something.'
    },
    {
        en: 'break in',
        description: 'Train a horse to be ridden.'
    },
    {
        en: 'break in',
        description: 'Carefully use new products until they are fully functional..'
    },
    {
        en: 'break off',
        description: 'Break a piece from something.'
    },
    {
        en: 'break off',
        description: 'End a relationship.'
    },
    {
        en: 'break out',
        description: 'Start (war, conflict).'
    },
    {
        en: 'break out in',
        description: 'Sweat heavily, develop skin sores or irritation..'
    },
    {
        en: 'break out of',
        description: 'Escape.'
    },
    {
        en: 'break through',
        description: 'Pass a barrier or obstacle.'
    },
    {
        en: 'break up',
        description: 'Break into many pieces.'
    },
    {
        en: 'break up',
        description: 'Close an educational institution for the holidays.'
    },
    {
        en: 'break up',
        description: 'Finish a relationship.'
    },
    {
        en: 'break up',
        description: 'Become inaudible over the telephone because of interference.'
    },
    {
        en: 'breeze along',
        description: 'Move easily and quickly.'
    },
    {
        en: 'breeze in',
        description: 'Enter a place quickly.'
    },
    {
        en: 'breeze into',
        description: 'Enter a place quickly.'
    },
    {
        en: 'breeze through',
        description: 'Pass easily, succeed.'
    },
    {
        en: 'brick in',
        description: 'Close or fill a space with bricks.'
    },
    {
        en: 'brick up',
        description: 'Close or fill a space with bricks.'
    },
    {
        en: 'brighten up',
        description: 'Improve (weather).'
    },
    {
        en: 'brighten up',
        description: 'Become happier.'
    },
    {
        en: 'brighten up',
        description: 'Make something more attractive or pleasant.'
    },
    {
        en: 'bring about',
        description: 'Make something happen.'
    },
    {
        en: 'bring along',
        description: 'Bring someone or something to certain place.'
    },
    {
        en: 'bring along',
        description: 'Help someone improve.'
    },
    {
        en: 'bring around',
        description: 'Persuade or convince someone.'
    },
    {
        en: 'bring around',
        description: 'Bring something with you when you visit.'
    },
    {
        en: 'bring around',
        description: 'Get someone talking about something.'
    },
    {
        en: 'bring back',
        description: 'Cause someone to remember.'
    },
    {
        en: 'bring back',
        description: 'Return.'
    },
    {
        en: 'bring down',
        description: 'Make a government fall.'
    },
    {
        en: 'bring down',
        description: 'Make something cheaper.'
    },
    {
        en: 'bring forth',
        description: 'Produce something, make it known or visible.'
    },
    {
        en: 'bring forth',
        description: 'Produce.'
    },
    {
        en: 'bring forth',
        description: 'Make something happen.'
    },
    {
        en: 'bring forth',
        description: 'Remove something from where it is kept or hidden.'
    },
    {
        en: 'bring forward',
        description: 'Make something happen earlier than originally planned.'
    },
    {
        en: 'bring in',
        description: 'Earn.'
    },
    {
        en: 'bring off',
        description: 'Succeed with something difficult.'
    },
    {
        en: 'bring on',
        description: 'Cause something to happen or speed up the process.'
    },
    {
        en: 'bring on',
        description: 'Make something appear.'
    },
    {
        en: 'bring out',
        description: 'Release or publish.'
    },
    {
        en: 'bring out',
        description: 'Elicit a response.'
    },
    {
        en: 'bring out in',
        description: 'Cause a health problem or reaction.'
    },
    {
        en: 'bring round',
        description: 'Make someone wake up from unconsciousness or an anaesthetic.'
    },
    {
        en: 'bring up',
        description: 'Mention.'
    },
    {
        en: 'bring up',
        description: 'Raise a child.'
    },
    {
        en: 'bring up',
        description: 'Be officially charged with a crime.'
    },
    {
        en: 'bring up',
        description: 'Mention.'
    },
    {
        en: 'bring up',
        description: 'Raise a child.'
    },
    {
        en: 'bring up',
        description: 'Be officially charged with a crime.'
    },
    {
        en: 'brush off',
        description: 'Ignore, pay little attention.'
    },
    {
        en: 'brush up',
        description: 'Improve a skill quickly.'
    },
    {
        en: 'bubble over',
        description: 'Become very excited.'
    },
    {
        en: 'buck up',
        description: 'Hurry (either transitive or reflexive).'
    },
    {
        en: 'buck up',
        description: 'Smarten up, improve.'
    },
    {
        en: 'bucket down',
        description: 'Rain heavily.'
    },
    {
        en: 'buckle down',
        description: 'Start working hard, apply yourself.'
    },
    {
        en: 'buckle under',
        description: 'Accept something under pressure, against your will.'
    },
    {
        en: 'buckle up',
        description: 'Fasten a seatbelt.'
    },
    {
        en: 'budge up',
        description: 'Move to make space for someone.'
    },
    {
        en: 'buff up',
        description: 'Clear, clean or make something shine.'
    },
    {
        en: 'buff up',
        description: 'Improve.'
    },
    {
        en: 'buff up on',
        description: 'Improve your knowledge quickly.'
    },
    {
        en: 'bug off!',
        description: 'Go away.'
    },
    {
        en: 'bug out',
        description: 'Open your eyes wide in surprise.'
    },
    {
        en: 'bug out',
        description: 'Leave somewhere in a hurry.'
    },
    {
        en: 'build up',
        description: 'Develop a company.'
    },
    {
        en: 'build up',
        description: 'Increase.'
    },
    {
        en: 'bulk out',
        description: 'Make something bigger or thicker.'
    },
    {
        en: 'bulk up',
        description: 'Gain weight, develop bigger muscles.'
    },
    {
        en: 'bump into',
        description: 'Meet by chance.'
    },
    {
        en: 'bump off',
        description: 'Kill.'
    },
    {
        en: 'bump up',
        description: 'Increase.'
    },
    {
        en: 'bundle off',
        description: 'Send someone somewhere.'
    },
    {
        en: 'bundle out',
        description: 'Expel.'
    },
    {
        en: 'bundle up',
        description: 'Put on warm clothing.'
    },
    {
        en: 'bundle up',
        description: 'Wrap or tie things together.'
    },
    {
        en: 'bunk off',
        description: 'Not go to school when you should.'
    },
    {
        en: 'buoy up',
        description: 'Make someone feel more positive.'
    },
    {
        en: 'buoy up',
        description: 'Keep afloat.'
    },
    {
        en: 'burn down',
        description: 'Burn completely.'
    },
    {
        en: 'burn off',
        description: 'Remove by burning or similar process.'
    },
    {
        en: 'burn out',
        description: 'Lose enthusiasm and energy to continue in a demanding job.'
    },
    {
        en: 'burn up',
        description: 'Destroy completely by fire.'
    },
    {
        en: 'burn up',
        description: 'Drive at high speed.'
    },
    {
        en: 'burn up',
        description: 'To be or cause to be highly annoyed.'
    },
    {
        en: 'burst into',
        description: 'Catch fire very quickly.'
    },
    {
        en: 'burst into',
        description: 'Laugh, cry or clap loudly.'
    },
    {
        en: 'bust up',
        description: 'End a relationship, usually angrily or after arguing.'
    },
    {
        en: 'butt in',
        description: 'Interrupt.'
    },
    {
        en: 'butt out',
        description: 'Not be involved in other people\'s business.'
    },
    {
        en: 'butter up',
        description: 'Praise or flatter someone excessively.'
    },
    {
        en: 'buy in',
        description: 'Force a CD or record into the charts by buying lots of copies.'
    },
    {
        en: 'buy into',
        description: 'Accept an idea.'
    },
    {
        en: 'buy off',
        description: 'Pay someone to stop them causing trouble.'
    },
    {
        en: 'buy out',
        description: 'Buy somebody\'s share in a company.'
    },
    {
        en: 'buy up',
        description: 'Buy all of something.'
    },
    {
        en: 'buzz around',
        description: 'Move quickly around a place.'
    },
    {
        en: 'buzz off',
        description: 'Leave somewhere.'
    },
    {
        en: 'buzz off!',
        description: 'Go away (imperative).'
    },
    {
        en: 'call after',
        description: 'Name someone after somebody else.'
    },
    {
        en: 'call around',
        description: 'Visit.'
    },
    {
        en: 'call back',
        description: 'Return a phonecall.'
    },
    {
        en: 'call for',
        description: 'Demand.'
    },
    {
        en: 'call for',
        description: 'Go to collect something.'
    },
    {
        en: 'call for',
        description: 'Telephone for something.'
    },
    {
        en: 'call for',
        description: 'Go and collect someone to take them out.'
    },
    {
        en: 'call for',
        description: 'Require.'
    },
    {
        en: 'call forth',
        description: 'Make something happen.'
    },
    {
        en: 'call in',
        description: 'Get someone to come and do a job.'
    },
    {
        en: 'call in',
        description: 'Stop and visit.'
    },
    {
        en: 'call off',
        description: 'Cancel.'
    },
    {
        en: 'call off',
        description: 'Order someone to stop attacking.'
    },
    {
        en: 'call on',
        description: 'Ask for help.'
    },
    {
        en: 'call on',
        description: 'Visit.'
    },
    {
        en: 'call on',
        description: 'Challenge.'
    },
    {
        en: 'call on',
        description: 'Ask someone to do something, especially to speak in public. (Formal).'
    },
    {
        en: 'call out',
        description: 'Expose or accuse someone of wrongdoing or incompetence.'
    },
    {
        en: 'call round',
        description: 'Visit.'
    },
    {
        en: 'call up',
        description: 'Summon someone for military service.'
    },
    {
        en: 'call up',
        description: 'Telephone.'
    },
    {
        en: 'calm down',
        description: 'Stop being angry or emotionally excited.'
    },
    {
        en: 'cancel out',
        description: 'Have an opposite effect on something that has happened, taking things back to the beginning.'
    },
    {
        en: 'cap off',
        description: 'Finish or complete, often with some decisive action.'
    },
    {
        en: 'care for',
        description: 'Like.'
    },
    {
        en: 'carried away',
        description: 'Get so emotional that you lose control.'
    },
    {
        en: 'carry forward',
        description: 'Include a figure in a later calculation.'
    },
    {
        en: 'carry forward',
        description: 'Make something progress.'
    },
    {
        en: 'carry off',
        description: 'Win, succeed.'
    },
    {
        en: 'carry off',
        description: 'Die of a disease.'
    },
    {
        en: 'carry on',
        description: 'Continue.'
    },
    {
        en: 'carry on',
        description: 'Behave badly.'
    },
    {
        en: 'carry on with',
        description: 'Have an affair.'
    },
    {
        en: 'carry out',
        description: 'Perform a task.'
    },
    {
        en: 'carry out',
        description: 'Food bought from a restaurant to take away.'
    },
    {
        en: 'carry over',
        description: 'Continue past a certain point.'
    },
    {
        en: 'carry through',
        description: 'Complete successfully.'
    },
    {
        en: 'cart off',
        description: 'Take someone away, usually under arrest or to prison.'
    },
    {
        en: 'cart off',
        description: 'Take something away, especially if stealing or without permission.'
    },
    {
        en: 'carve out',
        description: 'Create or get a area where you can be special or successful.'
    },
    {
        en: 'carve up',
        description: 'Divide into  smaller pieces.'
    },
    {
        en: 'carve up',
        description: 'Overtake someone and then pull directly in front of a car.'
    },
    {
        en: 'cash in',
        description: 'Convert shares, bonds, casino chips, etc, into money.'
    },
    {
        en: 'cash in on',
        description: 'Benefit or make money on something, especially if done unfairly.'
    },
    {
        en: 'cash out',
        description: 'Illegally access a bank account or credit card and steal money.'
    },
    {
        en: 'cash out',
        description: 'Exchange something for money, collect winnings.'
    },
    {
        en: 'cash up',
        description: 'Count all the money taken in a shop or business at the end of the day.'
    },
    {
        en: 'cast about for',
        description: 'Try to find something.'
    },
    {
        en: 'cast around for',
        description: 'Try to find something.'
    },
    {
        en: 'cast aside',
        description: 'Dispose, get rid of, ignore because you no longer like something or someone.'
    },
    {
        en: 'cast off',
        description: 'Dispose, get rid of.'
    },
    {
        en: 'cast off',
        description: 'Untie a boat so it\'s free to sail.'
    },
    {
        en: 'cast out',
        description: 'Expel, reject.'
    },
    {
        en: 'cast round for',
        description: 'Try to find something.'
    },
    {
        en: 'cast up',
        description: 'Be left on the shore by the sea.'
    },
    {
        en: 'catch at',
        description: 'Take or grab hold of something.'
    },
    {
        en: 'catch on',
        description: 'Become popular.'
    },
    {
        en: 'catch on',
        description: 'Finally understand what is going on.'
    },
    {
        en: 'catch out',
        description: 'Trick.'
    },
    {
        en: 'catch out',
        description: 'Discover or prove that someone is lying.'
    },
    {
        en: 'catch out',
        description: 'Put someone in an unexpected and difficult situation (often passive).'
    },
    {
        en: 'catch up',
        description: 'Get work, etc, up to date..'
    },
    {
        en: 'catch up',
        description: 'Reach someone who was ahead of you.'
    },
    {
        en: 'catch up in',
        description: 'Become involved, often against ones will.'
    },
    {
        en: 'catch up on',
        description: 'Do something that should have been done earlier.'
    },
    {
        en: 'catch up on',
        description: 'Reminisce with an old friend after not seeing them for a while.'
    },
    {
        en: 'catch up with',
        description: 'Do something that should have been done earlier.'
    },
    {
        en: 'catch up with',
        description: 'Meet someone after a period of time and find out what they have been doing.'
    },
    {
        en: 'catch up with',
        description: 'When something negative starts to have an effect.'
    },
    {
        en: 'catch up with',
        description: 'Punish someone after they have been doing something wrong for a long time.'
    },
    {
        en: 'catch up with',
        description: 'Learn something new that many people already understand.'
    },
    {
        en: 'cater for',
        description: 'To provide what is necessary.'
    },
    {
        en: 'cater to',
        description: 'To provide what is needed, often seen negatively.'
    },
    {
        en: 'cave in',
        description: 'Collapse.'
    },
    {
        en: 'cave in',
        description: 'Stop resisting or refusing.'
    },
    {
        en: 'chalk out',
        description: 'To cut a line of coca*ne.'
    },
    {
        en: 'chalk up',
        description: 'To achieve something good.'
    },
    {
        en: 'chalk up to',
        description: 'Explain the reason for a problem.'
    },
    {
        en: 'chance upon',
        description: 'Find something by accident.'
    },
    {
        en: 'change over',
        description: 'Change a system.'
    },
    {
        en: 'charge up',
        description: 'Put electricity into a battery.'
    },
    {
        en: 'charge with',
        description: 'Accuse somebody of a crime.'
    },
    {
        en: 'chase down',
        description: 'Try hard to find or get something.'
    },
    {
        en: 'chase off',
        description: 'Force a person to leave or go away.'
    },
    {
        en: 'chase up',
        description: 'Ensure that someone remembers to do something.'
    },
    {
        en: 'chase up',
        description: 'Try to get someone to pay a bill, debt, etc.'
    },
    {
        en: 'chase up',
        description: 'Try to get more information about the progress of something.'
    },
    {
        en: 'chat up',
        description: 'Talk to someone you are s*xu*lly interested in to get them interested in you.'
    },
    {
        en: 'cheat on',
        description: 'Be s*xu*lly unfaithful.'
    },
    {
        en: 'cheat on',
        description: 'Deceive or betray, often in a s*x*al and/or emotional context.'
    },
    {
        en: 'cheat out of',
        description: 'Get money from someone under false pretences.'
    },
    {
        en: 'check by',
        description: 'Visit a place to check something.'
    },
    {
        en: 'check in',
        description: 'Register on arriving at a hotel or at the airport.'
    },
    {
        en: 'check into',
        description: 'Register on arriving at a hotel or at the airport.'
    },
    {
        en: 'check off',
        description: 'Mark something on a list as done.'
    },
    {
        en: 'check out',
        description: 'Pay the bill when leaving a hotel.'
    },
    {
        en: 'check out',
        description: 'Die.'
    },
    {
        en: 'check out',
        description: 'Get information about or inspect something to see if it\'s satisfactory.'
    },
    {
        en: 'check out of',
        description: 'Settle up and pay before leaving a hotel.'
    },
    {
        en: 'check over',
        description: 'Check something very carefully.'
    },
    {
        en: 'cheer on',
        description: 'Encourage.'
    },
    {
        en: 'cheer up',
        description: 'Be less unhappy.'
    },
    {
        en: 'chew off',
        description: 'Remove by biting.'
    },
    {
        en: 'chew on',
        description: 'Thinks about something carefully before deciding.'
    },
    {
        en: 'chew out',
        description: 'Criticize someone angrily.'
    },
    {
        en: 'chew over',
        description: 'Think about an issue.'
    },
    {
        en: 'chew up',
        description: 'Cut into small pieces with your teeth.'
    },
    {
        en: 'chew up',
        description: 'Damage something inside a machine.'
    },
    {
        en: 'chicken out',
        description: 'Be too afraid to do something.'
    },
    {
        en: 'chill out',
        description: 'Relax.'
    },
    {
        en: 'chime in',
        description: 'Contribute to a discussion.'
    },
    {
        en: 'chip away at',
        description: 'Gradually reduce something to make it less powerful, effective, etc.'
    },
    {
        en: 'chip in',
        description: 'Contribute some money.'
    },
    {
        en: 'chip in',
        description: 'Contribute to a discussion.'
    },
    {
        en: 'choke off',
        description: 'Stop or restrict.'
    },
    {
        en: 'choke out',
        description: 'Clog or overwhelm.'
    },
    {
        en: 'choke up',
        description: 'Become tearfully emotional.'
    },
    {
        en: 'choke up',
        description: 'Grip a handle farther from the end for better control.'
    },
    {
        en: 'choose up',
        description: 'Form groups or teams.'
    },
    {
        en: 'chop down',
        description: 'Fell or cut down a tree.'
    },
    {
        en: 'chop up',
        description: 'Cut into small pieces.'
    },
    {
        en: 'chow down',
        description: 'Eat.'
    },
    {
        en: 'chow down on',
        description: 'Eat something.'
    },
    {
        en: 'chuck away',
        description: 'Dispose of something you no longer need or want.'
    },
    {
        en: 'chuck in',
        description: 'Quit something.'
    },
    {
        en: 'chuck in',
        description: 'Make a comment.'
    },
    {
        en: 'chuck out',
        description: 'Dispose of something you no longer need or want.'
    },
    {
        en: 'chuck up',
        description: 'Vomit, be sick.'
    },
    {
        en: 'chuck up',
        description: 'Quit something.'
    },
    {
        en: 'churn out',
        description: 'Produce, usually quickly or in large amounts without much regard to quality.'
    },
    {
        en: 'clag up',
        description: 'Make something sticky.'
    },
    {
        en: 'clam up',
        description: 'Be quiet, refuse to speak.'
    },
    {
        en: 'clamp down on',
        description: 'Restrict or try to stop something.'
    },
    {
        en: 'claw back',
        description: 'Get money back.'
    },
    {
        en: 'claw back',
        description: 'Retake possession with difficulty.'
    },
    {
        en: 'claw back',
        description: 'Regain possession with difficulty.'
    },
    {
        en: 'clean off',
        description: 'Remove dirt or something dirty.'
    },
    {
        en: 'clean out',
        description: 'Tidy up thoroughly and throw away unwanted things..'
    },
    {
        en: 'clean out',
        description: 'Cause someone to spend all their money.'
    },
    {
        en: 'clean up',
        description: 'Tidy and clean.'
    },
    {
        en: 'clean up',
        description: 'Profit, sometimes suddenly.'
    },
    {
        en: 'clear away',
        description: 'Leave a place.'
    },
    {
        en: 'clear away',
        description: 'Remove or tidy.'
    },
    {
        en: 'clear off',
        description: 'Leave somewhere quickly.'
    },
    {
        en: 'clear out',
        description: 'Tidy up thoroughly and throw away unwanted stuff..'
    },
    {
        en: 'clear out',
        description: 'Leave somewhere.'
    },
    {
        en: 'clear up',
        description: 'Cure or recover from an infection.'
    },
    {
        en: 'clear up',
        description: 'Tidy up.'
    },
    {
        en: 'clear up',
        description: 'Explain.'
    },
    {
        en: 'clear up',
        description: 'Improve (weather).'
    },
    {
        en: 'click through',
        description: 'Open an advertisement on the Internet.'
    },
    {
        en: 'climb down',
        description: 'Accept that you are wrong and change your position.'
    },
    {
        en: 'cling on',
        description: 'Hold tight.'
    },
    {
        en: 'cling on to',
        description: 'Try to keep something.'
    },
    {
        en: 'cling to',
        description: 'Try to maintain beliefs, hopes, etc..'
    },
    {
        en: 'clog up',
        description: 'Block, slow movement right down.'
    },
    {
        en: 'close down',
        description: 'Close a shop, branch or business permanently.'
    },
    {
        en: 'close down',
        description: 'Stop an opponent being a challenge.'
    },
    {
        en: 'close in',
        description: 'Surround, envelop.'
    },
    {
        en: 'close in',
        description: 'Approach, get near.'
    },
    {
        en: 'close in on',
        description: 'Get near someone.'
    },
    {
        en: 'close in upon',
        description: 'Get near someone.'
    },
    {
        en: 'close off',
        description: 'Block a place to stop people entering.'
    },
    {
        en: 'close on',
        description: 'Get nearer.'
    },
    {
        en: 'close out',
        description: 'Bring something to an end.'
    },
    {
        en: 'close out',
        description: 'Close or stop using.'
    },
    {
        en: 'close out',
        description: 'Ignore, exclude.'
    },
    {
        en: 'close up',
        description: 'Completely close something.'
    },
    {
        en: 'close up',
        description: 'Join together.'
    },
    {
        en: 'close up',
        description: 'Move closer together.'
    },
    {
        en: 'cloud over',
        description: 'Get very cloudy.'
    },
    {
        en: 'clown about',
        description: 'Behave stupidly or waste time.'
    },
    {
        en: 'clown around',
        description: 'Behave stupidly or waste time.'
    },
    {
        en: 'coast along',
        description: 'Do something without making much effort or trying to improve.'
    },
    {
        en: 'cobble together',
        description: 'Make, assemble or produce something quickly, without much care.'
    },
    {
        en: 'cock up',
        description: 'Ruin or spoil something.'
    },
    {
        en: 'color up',
        description: 'Blush.'
    },
    {
        en: 'come about',
        description: 'Happen, occur.'
    },
    {
        en: 'come about',
        description: 'Shift direction (nautical).'
    },
    {
        en: 'come across',
        description: 'Find by accident.'
    },
    {
        en: 'come across',
        description: 'Agree to have s*x with someone.'
    },
    {
        en: 'come across',
        description: 'The way other people see you.'
    },
    {
        en: 'come along',
        description: 'Accompany.'
    },
    {
        en: 'come along',
        description: 'Move faster or keep up.'
    },
    {
        en: 'come apart',
        description: 'Break into pieces.'
    },
    {
        en: 'come around',
        description: 'Recover consciousness.'
    },
    {
        en: 'come around to',
        description: 'Agree with or accept something you had previously disapproved of or disliked..'
    },
    {
        en: 'come back',
        description: 'Return.'
    },
    {
        en: 'come before',
        description: 'Appear in court charged with a crime or offence.'
    },
    {
        en: 'come by',
        description: 'Visit.'
    },
    {
        en: 'come by',
        description: 'Acquire.'
    },
    {
        en: 'come down',
        description: 'Rain.'
    },
    {
        en: 'come down',
        description: 'Travel.'
    },
    {
        en: 'come down on',
        description: 'Criticise heavily.'
    },
    {
        en: 'come down upon',
        description: 'Criticise, reprimand severely.'
    },
    {
        en: 'come down with',
        description: 'Fall ill.'
    },
    {
        en: 'come forth',
        description: 'Appear.'
    },
    {
        en: 'come forth with',
        description: 'Provide information.'
    },
    {
        en: 'come from',
        description: 'Country or town where you were born.'
    },
    {
        en: 'come in',
        description: 'Arrive for flights.'
    },
    {
        en: 'come in',
        description: 'Place or ranking in a competition, etc..'
    },
    {
        en: 'come in',
        description: 'Receive news.'
    },
    {
        en: 'come in for',
        description: 'Receive (criticism or praise).'
    },
    {
        en: 'come into',
        description: 'Be important or relevant.'
    },
    {
        en: 'come into',
        description: 'Inherit.'
    },
    {
        en: 'come into use',
        description: 'Start being used.'
    },
    {
        en: 'come off',
        description: 'When something breaks off.'
    },
    {
        en: 'come off',
        description: 'Be successful.'
    },
    {
        en: 'come off it',
        description: 'I don\'t believe what you\'re saying; used as an imperative.'
    },
    {
        en: 'come on',
        description: 'Encouragement.'
    },
    {
        en: 'come on',
        description: 'Start an illness.'
    },
    {
        en: 'come on',
        description: 'Start functioning (machines, etc).'
    },
    {
        en: 'come out',
        description: 'A secret is revealed.'
    },
    {
        en: 'come out',
        description: 'Be published or otherwise available to the public.'
    },
    {
        en: 'come out',
        description: 'Disappear when washed.'
    },
    {
        en: 'come out',
        description: 'Let people know that you are lesbian or gay.'
    },
    {
        en: 'come out',
        description: 'When the sun appears.'
    },
    {
        en: 'come out in',
        description: 'Have a rash or similar skin problem.'
    },
    {
        en: 'come out of',
        description: 'Recover consciousness.'
    },
    {
        en: 'come out with',
        description: 'Make something available.'
    },
    {
        en: 'come out with',
        description: 'Say something publicly and unexpectedly.'
    },
    {
        en: 'come over',
        description: 'Feel strange.'
    },
    {
        en: 'come over',
        description: 'Affect mentally in such a way as to change behaviour (possibly related to \'overcome\').'
    },
    {
        en: 'come round',
        description: 'Become conscious, wake up from anaesthetic.'
    },
    {
        en: 'come round',
        description: 'Change your opinion.'
    },
    {
        en: 'come through',
        description: 'Arrive (messages and information).'
    },
    {
        en: 'come through',
        description: 'Communicate an emotion.'
    },
    {
        en: 'come through',
        description: 'Produce a result.'
    },
    {
        en: 'come through with',
        description: 'Provide something needed.'
    },
    {
        en: 'come to',
        description: 'Become conscious, wake up from anaesthetic.'
    },
    {
        en: 'come to',
        description: 'Result in.'
    },
    {
        en: 'come up',
        description: 'Appear.'
    },
    {
        en: 'come up',
        description: 'Rise (the sun).'
    },
    {
        en: 'come up against',
        description: 'Encounter problems or difficulties.'
    },
    {
        en: 'come up with',
        description: 'Think of a solution, excuse, etc..'
    },
    {
        en: 'come upon',
        description: 'Find by chance.'
    },
    {
        en: 'conjure up',
        description: 'Create a picture or memory in someone\'s mind.'
    },
    {
        en: 'conjure up',
        description: 'Create something without many resources.'
    },
    {
        en: 'conk out',
        description: 'Fall fast asleep.'
    },
    {
        en: 'conk out',
        description: 'Suddenly breakdown or stop working.'
    },
    {
        en: 'contract in',
        description: 'Become involved or committed to something.'
    },
    {
        en: 'contract out',
        description: 'Give a contract for a service outside the company you work for.'
    },
    {
        en: 'contract out of',
        description: 'Formally leave and agreement.'
    },
    {
        en: 'cool down',
        description: 'Get cooler.'
    },
    {
        en: 'cool down',
        description: 'Become calm.'
    },
    {
        en: 'cool off',
        description: 'Become calmer.'
    },
    {
        en: 'coop up',
        description: 'Confine in a small area.'
    },
    {
        en: 'cop it',
        description: 'Get into trouble.'
    },
    {
        en: 'cop off',
        description: 'Leave work or school early.'
    },
    {
        en: 'cop off',
        description: 'Kiss, pet or have s*x with someone.'
    },
    {
        en: 'cop out',
        description: 'Choose an easy alternative.'
    },
    {
        en: 'cost up',
        description: 'Calculate how expensive some work is going to be.'
    },
    {
        en: 'cotton on',
        description: 'To work out the truth.'
    },
    {
        en: 'cough up',
        description: 'Lose possession of a ball, etc. in a contact sport.'
    },
    {
        en: 'cough up',
        description: 'Expel something from your lungs or throat by coughing.'
    },
    {
        en: 'could do with',
        description: 'Need or want something.'
    },
    {
        en: 'count against',
        description: 'Affect negatively, make less likely to succeed.'
    },
    {
        en: 'count among',
        description: 'Include someone or something in a group, category, etc.'
    },
    {
        en: 'count down',
        description: 'Wait impatiently or excitedly for something to happen.'
    },
    {
        en: 'count for',
        description: 'Be recognised as important, worthwhile or valuable.'
    },
    {
        en: 'count in',
        description: 'Include or involve.'
    },
    {
        en: 'count off',
        description: 'Say numbers aloud in a sequence.'
    },
    {
        en: 'count on',
        description: 'Depend, rely.'
    },
    {
        en: 'count on',
        description: 'Expect something to happen and base plans on it.'
    },
    {
        en: 'count out',
        description: 'Exclude.'
    },
    {
        en: 'count out',
        description: 'Count a certain amount of money.'
    },
    {
        en: 'count towards',
        description: 'Be a part needed to complete something.'
    },
    {
        en: 'count up',
        description: 'Add.'
    },
    {
        en: 'count upon',
        description: 'Expect something to happen and base plans on it.'
    },
    {
        en: 'count upon',
        description: 'Depend, rely.'
    },
    {
        en: 'cover for',
        description: 'Provide an excuse or alibi.'
    },
    {
        en: 'cover for',
        description: 'Do someone\'s work while they are temporarily absent.'
    },
    {
        en: 'cover up',
        description: 'Conceal, try to stop people finding out.'
    },
    {
        en: 'cozy up',
        description: 'Make yourself comfortable.'
    },
    {
        en: 'cozy up to',
        description: 'Make yourself popular with someone.'
    },
    {
        en: 'crack down on',
        description: 'Use more authority than usual.'
    },
    {
        en: 'crack on',
        description: 'Continue doing something with energy.'
    },
    {
        en: 'crack up',
        description: 'Have a nervous breakdown.'
    },
    {
        en: 'crack up',
        description: 'Have bad reception on a mobile phone.'
    },
    {
        en: 'crack up',
        description: 'Burst out laughing.'
    },
    {
        en: 'crack up',
        description: 'Damage a car badly.'
    },
    {
        en: 'crank out',
        description: 'Produce a lot of something fast.'
    },
    {
        en: 'crank up',
        description: 'Inject non-medical dr*gs.'
    },
    {
        en: 'crank up',
        description: 'Start a machine, originally with a handle.'
    },
    {
        en: 'crank up',
        description: 'Increase, make something bigger.'
    },
    {
        en: 'crash out',
        description: 'Sleep at someone\'s house because you are too tired, drunk, etc. to leave.'
    },
    {
        en: 'crash out',
        description: 'Fall asleep.'
    },
    {
        en: 'cream off',
        description: 'Separate the best or most talented people so that they can receive special or different treatment.'
    },
    {
        en: 'cream off',
        description: 'Take money or divert funds, usually wrongfully or unfairly.'
    },
    {
        en: 'creep in',
        description: 'Start to be noticeable.'
    },
    {
        en: 'creep in',
        description: 'Get included despite attempts to keep it or them out.'
    },
    {
        en: 'creep into',
        description: 'Become noticeable in something.'
    },
    {
        en: 'creep out',
        description: 'make someone feel worried or uneasy.'
    },
    {
        en: 'creep out on',
        description: 'To do the same activity for a very long time.'
    },
    {
        en: 'creep over',
        description: 'Start to have a negative feeling.'
    },
    {
        en: 'creep up on',
        description: 'Approach without someone realising.'
    },
    {
        en: 'crop up',
        description: 'Appear unexpectedly.'
    },
    {
        en: 'cross off',
        description: 'Delete, remove from a list.'
    },
    {
        en: 'cross out',
        description: 'Put as line through some writing to show it is wrong.'
    },
    {
        en: 'cross up',
        description: 'Confuse, deceive.'
    },
    {
        en: 'cruise through',
        description: 'Pass or succeed easily.'
    },
    {
        en: 'crumb down',
        description: 'Clear a table in a restaurant.'
    },
    {
        en: 'cry off',
        description: 'To cancel an arrangement.'
    },
    {
        en: 'cry out',
        description: 'Shout because you are in pain.'
    },
    {
        en: 'cut across',
        description: 'Go across a place rather than around it to make the journey quicker.'
    },
    {
        en: 'cut across',
        description: 'Affect people of different groups, classes, etc.'
    },
    {
        en: 'cut back',
        description: 'Reduce.'
    },
    {
        en: 'cut back',
        description: 'Remove branches from a plant or tree to encourage future growth.'
    },
    {
        en: 'cut back on',
        description: 'Reduce expenditure.'
    },
    {
        en: 'cut down',
        description: 'Consume less.'
    },
    {
        en: 'cut down',
        description: 'Shoot.'
    },
    {
        en: 'cut down',
        description: 'Reduce a vertical thing to ground level by cutting.'
    },
    {
        en: 'cut down',
        description: 'Cut something from a high position.'
    },
    {
        en: 'cut down on',
        description: 'Reduce.'
    },
    {
        en: 'cut in',
        description: 'Start functioning.'
    },
    {
        en: 'cut in',
        description: 'Drive in front of another vehicle without warning.'
    },
    {
        en: 'cut in',
        description: 'Interrupt.'
    },
    {
        en: 'cut in',
        description: 'Include someone in a deal that makes money.'
    },
    {
        en: 'cut in',
        description: 'Mix fat and flour until the combine.'
    },
    {
        en: 'cut it out',
        description: 'Stop your unfair or unreasonable behaviour.'
    },
    {
        en: 'cut off',
        description: 'Disconnect.'
    },
    {
        en: 'cut off',
        description: 'Isolate or make inaccessible.'
    },
    {
        en: 'cut out',
        description: 'Exclude.'
    },
    {
        en: 'cut out',
        description: 'When an engine or motor stops.'
    },
    {
        en: 'cut out',
        description: 'Cut a picture or similar from a magazine, etc.'
    },
    {
        en: 'cut out',
        description: 'Leave quickly.'
    },
    {
        en: 'cut out',
        description: 'Separate livestock from a group.'
    },
    {
        en: 'cut out on',
        description: 'Let down, snub.'
    },
    {
        en: 'cut up',
        description: 'Cut into smaller pieces.'
    },
    {
        en: 'cut up',
        description: 'Drive into a neighbouring lane, directly in front of another vehicle.'
    },
    {
        en: 'cut up',
        description: 'Upset.'
    },
    {
        en: 'cut up',
        description: 'Have a lot of small injuries.'
    },
    {
        en: 'damp down',
        description: 'Calm or reduce feelings, emotions.'
    },
    {
        en: 'damp down',
        description: 'Make a fire burn less.'
    },
    {
        en: 'damp off',
        description: 'When there is too much moisture and a plant is affected by fungal parasites.'
    },
    {
        en: 'dash down',
        description: 'Write something quickly.'
    },
    {
        en: 'dash off',
        description: 'Leave somewhere quickly.'
    },
    {
        en: 'dash off',
        description: 'Do something quickly, especially writing.'
    },
    {
        en: 'dawn on',
        description: 'Finally realise or understand something.'
    },
    {
        en: 'decide on',
        description: 'Choose, select.'
    },
    {
        en: 'decide upon',
        description: 'Choose, select.'
    },
    {
        en: 'die away',
        description: 'Become quieter or inaudible (of a sound).'
    },
    {
        en: 'die back',
        description: 'When the parts of a plant above ground die, but the roots remain alive.'
    },
    {
        en: 'die down',
        description: 'Decrease or become quieter.'
    },
    {
        en: 'die for',
        description: 'Want something a lot.'
    },
    {
        en: 'die off',
        description: 'Become extinct.'
    },
    {
        en: 'die out',
        description: 'Become extinct or disappear.'
    },
    {
        en: 'dig in',
        description: 'Start eating greedily.'
    },
    {
        en: 'dig in',
        description: 'Excavate a protective shelter (military).'
    },
    {
        en: 'dig into',
        description: 'Reach inside to get something.'
    },
    {
        en: 'dig out',
        description: 'Find something you haven\'t used, seen, etc, for a long time.'
    },
    {
        en: 'dig out',
        description: 'Dig to remove something or someone.'
    },
    {
        en: 'dig up',
        description: 'Find something that is supposed to be secret.'
    },
    {
        en: 'dig up',
        description: 'Remove something from the ground.'
    },
    {
        en: 'dig up',
        description: 'Make a hole in a road, the ground, etc.'
    },
    {
        en: 'dine out',
        description: 'Have dinner outside your home.'
    },
    {
        en: 'dine out on',
        description: 'Tell a story repeatedly that is well received.'
    },
    {
        en: 'dip in',
        description: 'Put something in a liquid for a short time.'
    },
    {
        en: 'dip into',
        description: 'Read parts of a book, but not all.'
    },
    {
        en: 'dip into',
        description: 'Take money out of your savings.'
    },
    {
        en: 'dip out',
        description: 'Leave a place without telling anyone.'
    },
    {
        en: 'disagree with',
        description: 'Make someone feel sick or ill.'
    },
    {
        en: 'dish out',
        description: 'Serve food.'
    },
    {
        en: 'dish out',
        description: 'Give something, usually when you shouldn\'t.'
    },
    {
        en: 'dish out',
        description: 'Criticise, when you can\'t take criticism in return.'
    },
    {
        en: 'dish up',
        description: 'Serve food.'
    },
    {
        en: 'dive in',
        description: 'Start doing something, usually without planning.'
    },
    {
        en: 'dive in',
        description: 'Start eating.'
    },
    {
        en: 'dive into',
        description: 'Reach inside something quickly.'
    },
    {
        en: 'divide up',
        description: 'Share.'
    },
    {
        en: 'divvy out',
        description: 'Divide, share.'
    },
    {
        en: 'divvy up',
        description: 'Divide, share.'
    },
    {
        en: 'do away with',
        description: 'Abolish, get rid of.'
    },
    {
        en: 'do in',
        description: 'Kill.'
    },
    {
        en: 'do out of',
        description: 'Cheat somebody out of something that is rightfully theirs.'
    },
    {
        en: 'do up',
        description: 'Close or fasten clothes, etc..'
    },
    {
        en: 'do up',
        description: 'Repair and renovate.'
    },
    {
        en: 'do with',
        description: 'Wish for or ask for (usually after can or could).'
    },
    {
        en: 'do without',
        description: 'Manage without something.'
    },
    {
        en: 'dob in',
        description: 'Report someone to teachers, authorities, etc.'
    },
    {
        en: 'dob in',
        description: 'Contribute money.'
    },
    {
        en: 'dob in',
        description: 'Pressure someone into doing something.'
    },
    {
        en: 'dole out',
        description: 'Give out, distribute.'
    },
    {
        en: 'doss about',
        description: 'Spend time doing very little or being unproductive.'
    },
    {
        en: 'doss around',
        description: 'Spend time doing very little or being unproductive.'
    },
    {
        en: 'doss down',
        description: 'Sleep somewhere temporarily because you don\'t go home.'
    },
    {
        en: 'double as',
        description: 'Have a second function or purpose.'
    },
    {
        en: 'double back',
        description: 'Go back the way you were coming.'
    },
    {
        en: 'double over',
        description: 'Bend over at the waist.'
    },
    {
        en: 'double up',
        description: 'Bend over at the waist.'
    },
    {
        en: 'double up',
        description: 'Share accommodation because there are too many people.'
    },
    {
        en: 'double up as',
        description: 'Have a second function or purpose.'
    },
    {
        en: 'doze off',
        description: 'Fall asleep.'
    },
    {
        en: 'drag on',
        description: 'Be unnecessarily long.'
    },
    {
        en: 'draw back',
        description: 'Retreat, move backwards.'
    },
    {
        en: 'draw down',
        description: 'Reduce levels.'
    },
    {
        en: 'draw down',
        description: 'Get funding.'
    },
    {
        en: 'draw down',
        description: 'To deplete by consumption or heavy spending.'
    },
    {
        en: 'draw even',
        description: 'Equalize ones competitive position.'
    },
    {
        en: 'draw in',
        description: 'Get dark earlier.'
    },
    {
        en: 'draw in',
        description: 'Arrive at a station (for trains).'
    },
    {
        en: 'draw into',
        description: 'Get involved in something unpleasant.'
    },
    {
        en: 'draw on',
        description: 'Pass slowly (time).'
    },
    {
        en: 'draw on',
        description: 'Inhale smoke from a cigarette, cigar, etc.'
    },
    {
        en: 'draw out',
        description: 'Make something continue longer than needed.'
    },
    {
        en: 'draw out',
        description: 'Make a shy person more outgoing.'
    },
    {
        en: 'draw up',
        description: 'Prepare a contract.'
    },
    {
        en: 'draw up',
        description: 'When a vehicle stops.'
    },
    {
        en: 'dream of',
        description: 'Not think or consider.'
    },
    {
        en: 'dream up',
        description: 'Invent something, have an idea.'
    },
    {
        en: 'dredge up',
        description: 'Discover things about someone\'s past.'
    },
    {
        en: 'dress down',
        description: 'Dress casually.'
    },
    {
        en: 'dress down',
        description: 'Scold.'
    },
    {
        en: 'dress up',
        description: 'Dress very smartly.'
    },
    {
        en: 'drift apart',
        description: 'Slowly cease to be close to or friends with someone.'
    },
    {
        en: 'drift off',
        description: 'Start to fall asleep.'
    },
    {
        en: 'drill down',
        description: 'Search through layers of information on a computer.'
    },
    {
        en: 'drill down through',
        description: 'Get to the bottom of something, get detailed data.'
    },
    {
        en: 'drill into',
        description: 'Repeat something many times to make someone learn it.'
    },
    {
        en: 'drink up',
        description: 'Finish a drink.'
    },
    {
        en: 'drive away',
        description: 'Force an animal or someone to leave a place.'
    },
    {
        en: 'drive back',
        description: 'Repulse, force back.'
    },
    {
        en: 'drive by',
        description: 'Do something out of a car.'
    },
    {
        en: 'drive off',
        description: 'Drive away from a place.'
    },
    {
        en: 'drive out',
        description: 'Force someone to leave a place.'
    },
    {
        en: 'drive up',
        description: 'Make something increase.'
    },
    {
        en: 'drive up',
        description: 'Arrive in a vehicle.'
    },
    {
        en: 'drone on',
        description: 'Talk boringly for a long time.'
    },
    {
        en: 'drop around',
        description: 'Visit someone, often without making  an arrangement.'
    },
    {
        en: 'drop around',
        description: 'Deliver.'
    },
    {
        en: 'drop away',
        description: 'Become smaller- amount, numbers.'
    },
    {
        en: 'drop back',
        description: 'Move towards the back of a group.'
    },
    {
        en: 'drop by',
        description: 'Pay a brief visit.'
    },
    {
        en: 'drop in',
        description: 'Visit without having made arrangements.'
    },
    {
        en: 'drop off',
        description: 'Take something or someone to a place and leave it or them there..'
    },
    {
        en: 'drop off',
        description: 'Fall asleep.'
    },
    {
        en: 'drop off',
        description: 'Decrease in number or amount.'
    },
    {
        en: 'drop out',
        description: 'Quit a course.'
    },
    {
        en: 'drop over',
        description: 'Visit for a short time.'
    },
    {
        en: 'drop round',
        description: 'Visit someone, often without making  an arrangement.'
    },
    {
        en: 'drop round',
        description: 'Deliver.'
    },
    {
        en: 'drop someone in it',
        description: 'Get someone into trouble.'
    },
    {
        en: 'drop through',
        description: 'Come to nothing, produce no results.'
    },
    {
        en: 'drown in',
        description: 'Cover excessively.'
    },
    {
        en: 'drown out',
        description: 'Be so loud that another sound cannot be heard.'
    },
    {
        en: 'drum into',
        description: 'To make someone learn or believe something by constant repetition.'
    },
    {
        en: 'drum out',
        description: 'Force someone out of their job or position.'
    },
    {
        en: 'drum up',
        description: 'Increase support or interest.'
    },
    {
        en: 'dry off',
        description: 'Dry  something quickly, or dry the surface.'
    },
    {
        en: 'dry out',
        description: 'Stop drinking or taking dr*gs when addicted.'
    },
    {
        en: 'dry out',
        description: 'Dry something fully.'
    },
    {
        en: 'dry up',
        description: 'Lose all the water from a river, lake, source, etc.'
    },
    {
        en: 'dry up',
        description: 'Stop being supplied with something.'
    },
    {
        en: 'dry up',
        description: 'Be unable to speak.'
    },
    {
        en: 'dry up',
        description: 'Dry plates, dishes, cutlery, etc, after washing them up.'
    },
    {
        en: 'duck out of',
        description: 'Avoid doing something.'
    },
    {
        en: 'duff up',
        description: 'Beat or hit someone repeatedly.'
    },
    {
        en: 'dumb down',
        description: 'Reduce the intellectual level of something in search of popularity.'
    },
    {
        en: 'dump on',
        description: 'Treat someone badly.'
    },
    {
        en: 'dump on',
        description: 'Criticize heavily, often unfairly.'
    },
    {
        en: 'dump on',
        description: 'Tell someone your problems.'
    },
    {
        en: 'dwell on',
        description: 'Spend a lot of time on something.'
    },
    {
        en: 'dwell upon',
        description: 'Spend a lot of time on something.'
    },
    {
        en: 'ease off',
        description: 'Reduce pressure.'
    },
    {
        en: 'ease up',
        description: 'Relax, calm down.'
    },
    {
        en: 'eat away',
        description: 'Destroy slowly.'
    },
    {
        en: 'eat in',
        description: 'Eat at home.'
    },
    {
        en: 'eat into',
        description: 'Use something valuable when you don\'t want to.'
    },
    {
        en: 'eat out',
        description: 'Eat in a restaurant.'
    },
    {
        en: 'eat up',
        description: 'Eat all of something.'
    },
    {
        en: 'eat up',
        description: 'Consume.'
    },
    {
        en: 'eat up',
        description: 'Consume something you don\'t want to be consumed.'
    },
    {
        en: 'ebb away',
        description: 'Disappear gradually.'
    },
    {
        en: 'edge out',
        description: 'Gradually push someone or something out of their position.'
    },
    {
        en: 'edge up',
        description: 'Approach slowly.'
    },
    {
        en: 'egg on',
        description: 'Encourage.'
    },
    {
        en: 'eke out',
        description: 'Make something like money last as long as possible.'
    },
    {
        en: 'embark on',
        description: 'Start a project or venture.'
    },
    {
        en: 'embark upon',
        description: 'Start a project or venture.'
    },
    {
        en: 'empty out',
        description: 'Empty something completely.'
    },
    {
        en: 'empty out',
        description: 'Remove some things or everything from a container.'
    },
    {
        en: 'end in',
        description: 'Finish a certain way.'
    },
    {
        en: 'end up',
        description: 'Become or do something unplanned.'
    },
    {
        en: 'end up with',
        description: 'Get as a result of something.'
    },
    {
        en: 'enter for',
        description: 'Join or enter a competition.'
    },
    {
        en: 'enter into',
        description: 'Become involved in or accept.'
    },
    {
        en: 'eye up',
        description: 'Look carefully at someone.'
    },
    {
        en: 'face off',
        description: 'Confront.'
    },
    {
        en: 'face up to',
        description: 'Accept an unpleasant truth.'
    },
    {
        en: 'faff about',
        description: 'Behave indecisively.'
    },
    {
        en: 'faff around',
        description: 'Behave indecisively.'
    },
    {
        en: 'fall about',
        description: 'Laugh a lot.'
    },
    {
        en: 'fall apart',
        description: 'Break into pieces.'
    },
    {
        en: 'fall apart',
        description: 'Become emotionally disturbed and unable to behave normally.'
    },
    {
        en: 'fall back',
        description: 'Retreat.'
    },
    {
        en: 'fall back on',
        description: 'Be able to use in an emergency.'
    },
    {
        en: 'fall behind',
        description: 'Make less progress.'
    },
    {
        en: 'fall down',
        description: 'Fall on the ground.'
    },
    {
        en: 'fall down',
        description: 'Have a weak point.'
    },
    {
        en: 'fall for',
        description: 'Be attracted to somebody, fall in love.'
    },
    {
        en: 'fall for',
        description: 'Believe a lie or a piece of deception.'
    },
    {
        en: 'fall in',
        description: 'Collapse.'
    },
    {
        en: 'fall into',
        description: 'Start doing something unplanned.'
    },
    {
        en: 'fall off',
        description: 'Decrease.'
    },
    {
        en: 'fall out',
        description: 'Argue and be on bad terms with someone.'
    },
    {
        en: 'fall out',
        description: 'Lose hair.'
    },
    {
        en: 'fall over',
        description: 'Fall on the ground.'
    },
    {
        en: 'fall through',
        description: 'Be unsuccessful.'
    },
    {
        en: 'fall under',
        description: 'Become controlled.'
    },
    {
        en: 'farm out',
        description: 'Give or contract work to someone else.'
    },
    {
        en: 'fart about',
        description: 'Waste time doing silly things.'
    },
    {
        en: 'fart around',
        description: 'Waste time doing pointless things.'
    },
    {
        en: 'fasten down',
        description: 'Tie something so that it doesn\'t move.'
    },
    {
        en: 'fasten on',
        description: 'Give attention to something that confirms your beliefs.'
    },
    {
        en: 'fasten onto',
        description: 'Follow someone closely, normally when they don\'t want your company.'
    },
    {
        en: 'fasten onto',
        description: 'Give attention to something that confirms your beliefs.'
    },
    {
        en: 'fasten up',
        description: 'Close, attach.'
    },
    {
        en: 'fathom out',
        description: 'Understand something.'
    },
    {
        en: 'fatten up',
        description: 'Give an animal a lot to eat to make it fat.'
    },
    {
        en: 'fawn on',
        description: 'Praise someone in an excessive way to get their favour or something from them.'
    },
    {
        en: 'fawn over',
        description: 'Praise someone in an excessive way to get their favour or something from them.'
    },
    {
        en: 'feed off',
        description: 'Eat a food as part of an animals diet.'
    },
    {
        en: 'feed off',
        description: 'Use something to your advantage.'
    },
    {
        en: 'feed on',
        description: 'Grow stronger.'
    },
    {
        en: 'feed on',
        description: 'Consume in an animal\'s diet.'
    },
    {
        en: 'feed on',
        description: 'Give someone a particular food.'
    },
    {
        en: 'feed up',
        description: 'Give someone a lot of food to restore their health, make them bigger, etc.'
    },
    {
        en: 'feel up',
        description: 'Touch s*xu*lly, grope.'
    },
    {
        en: 'feel up to',
        description: 'Feel capable of doing something.'
    },
    {
        en: 'fence in',
        description: 'Enclose an area.'
    },
    {
        en: 'fence off',
        description: 'Enclose an area to keep animals or people out.'
    },
    {
        en: 'fend for',
        description: 'Take care of yourself or someone with help from other people.'
    },
    {
        en: 'fend off',
        description: 'Resist something successfully.'
    },
    {
        en: 'fend off',
        description: 'Push an attacker away.'
    },
    {
        en: 'ferret out',
        description: 'Search and discover something.'
    },
    {
        en: 'fess up',
        description: 'Confess, admit something reluctantly.'
    },
    {
        en: 'fess up',
        description: 'Give.'
    },
    {
        en: 'fess up to',
        description: 'Confess, admit reluctantly to something.'
    },
    {
        en: 'fiddle about',
        description: 'Waste time doing silly things, or doing things unsuccessfully.'
    },
    {
        en: 'fiddle around',
        description: 'Waste time doing silly things, or unsuccessful things.'
    },
    {
        en: 'fiddle around',
        description: 'Make small movements with your hands.'
    },
    {
        en: 'fiddle away',
        description: 'Waste time.'
    },
    {
        en: 'fight back',
        description: 'Defend yourself, resist an attack.'
    },
    {
        en: 'fight back',
        description: 'Try to control and emotion and keep it hidden.'
    },
    {
        en: 'fight it out',
        description: 'Struggle to see who wins, both by arguing or fighting.'
    },
    {
        en: 'fight off',
        description: 'Fight an attacker and force them back.'
    },
    {
        en: 'fight off',
        description: 'Resist an illness or emotion.'
    },
    {
        en: 'figure on',
        description: 'Plan, expect.'
    },
    {
        en: 'figure out',
        description: 'Find the answer to a problem.'
    },
    {
        en: 'file away',
        description: 'Put a document in the correct place for storage in a filing system.'
    },
    {
        en: 'file for',
        description: 'Apply for something legally, like divorce or bankruptcy.'
    },
    {
        en: 'fill in',
        description: 'Complete a form.'
    },
    {
        en: 'fill in',
        description: 'Substitute someone at work.'
    },
    {
        en: 'fill in for',
        description: 'Substitute.'
    },
    {
        en: 'fill in on',
        description: 'Give someone information.'
    },
    {
        en: 'fill out',
        description: 'Complete a form.'
    },
    {
        en: 'fill up',
        description: 'Fill something completely.'
    },
    {
        en: 'filter in',
        description: 'Move into a lane of traffic without making other cars stop.'
    },
    {
        en: 'filter out',
        description: 'Remove something unwanted.'
    },
    {
        en: 'find out',
        description: 'Discover.'
    },
    {
        en: 'finish off',
        description: 'Finish completely.'
    },
    {
        en: 'finish off',
        description: 'Kill a person or animal, often when they have already been hurt.'
    },
    {
        en: 'finish off',
        description: 'Beat, make victory certain in sport.'
    },
    {
        en: 'finish off',
        description: 'Consume all.'
    },
    {
        en: 'finish up',
        description: 'Finally get somewhere, usually without  planning to go there.'
    },
    {
        en: 'finish up with',
        description: 'Have or do something at the end or as the last of something.'
    },
    {
        en: 'finish with',
        description: 'End a relationship.'
    },
    {
        en: 'finish with',
        description: 'Stop dealing with someone.'
    },
    {
        en: 'finish with',
        description: 'Finish using or requiring.'
    },
    {
        en: 'fink on',
        description: 'Give away secrets about someone.'
    },
    {
        en: 'fink out',
        description: 'Fail to keep a promise, arrangement, etc.'
    },
    {
        en: 'fire away',
        description: 'Ask questions.'
    },
    {
        en: 'fire off',
        description: 'Send quickly, angrily or many (letter, emails, etc).'
    },
    {
        en: 'fire off',
        description: 'Shoot, fire a gun (usually repeatedly).'
    },
    {
        en: 'fire up',
        description: 'Start a computer.'
    },
    {
        en: 'fire up',
        description: 'Excite, become excited.'
    },
    {
        en: 'firm up',
        description: 'Make things clearer in a negotiation or discussion.'
    },
    {
        en: 'firm up',
        description: 'Exercise to make muscles harder and remove fat.'
    },
    {
        en: 'fish for',
        description: 'Try to get some information or to get someone to say something.'
    },
    {
        en: 'fish out',
        description: 'Remove something from a bag, pocket, etc.'
    },
    {
        en: 'fish out',
        description: 'Remove from water, such as the sea, rivers, etc.'
    },
    {
        en: 'fit in',
        description: 'Get on in a group of people.'
    },
    {
        en: 'fit in',
        description: 'Have enough time or space for something.'
    },
    {
        en: 'fit in with',
        description: 'Be convenient or occur conveniently.'
    },
    {
        en: 'fit in with',
        description: 'Occur or happen in a way that shows that plans or ideas have not changed.'
    },
    {
        en: 'fit into',
        description: 'Become part of.'
    },
    {
        en: 'fit out',
        description: 'Provide with necessary equipment.'
    },
    {
        en: 'fit out with',
        description: 'Provide someone with necessary equipment.'
    },
    {
        en: 'fit up',
        description: 'Frame someone- make them look guilty of something they haven\'t done.'
    },
    {
        en: 'fit up',
        description: 'Provide equipment.'
    },
    {
        en: 'fix up',
        description: 'Make an arrangement.'
    },
    {
        en: 'fizzle out',
        description: 'End in an unsuccessful way.'
    },
    {
        en: 'flag down',
        description: 'Signal at a vehicle to get it to stop.'
    },
    {
        en: 'flag up',
        description: 'Raise an issue, or highlight its importance.'
    },
    {
        en: 'flake out',
        description: 'Fall asleep from exhaustion.'
    },
    {
        en: 'flame out',
        description: 'Fail.'
    },
    {
        en: 'flame up',
        description: 'Burn brightly.'
    },
    {
        en: 'flare out',
        description: 'Get angry suddenly.'
    },
    {
        en: 'flare up',
        description: 'When trouble suddenly appears.'
    },
    {
        en: 'flesh out',
        description: 'Add more details or information.'
    },
    {
        en: 'flick over',
        description: 'Change TV channels quickly.'
    },
    {
        en: 'flick through',
        description: 'Change TV channels repeatedly.'
    },
    {
        en: 'flick through',
        description: 'Look through something quickly.'
    },
    {
        en: 'flip off',
        description: 'Extend your middle finger as a gesture of contempt.'
    },
    {
        en: 'flip out',
        description: 'Become very excited and lose control.'
    },
    {
        en: 'flip through',
        description: 'Look quickly through a magazine, book, etc.'
    },
    {
        en: 'flog off',
        description: 'Sell something cheaply to get rid of it.'
    },
    {
        en: 'floor it',
        description: 'Drive a vehicle as fast as possible.'
    },
    {
        en: 'flounce off',
        description: 'Leave a place or walk away from someone angrily.'
    },
    {
        en: 'flounce out',
        description: 'Leave a place angrily.'
    },
    {
        en: 'fluff out',
        description: 'Shake or pat a cushion so that it fills with air.'
    },
    {
        en: 'fluff up',
        description: 'Shake or pat a cushion so that it fills with air.'
    },
    {
        en: 'fly about',
        description: 'Circulate (rumours, etc).'
    },
    {
        en: 'fly around',
        description: 'Circulate (rumours, etc).'
    },
    {
        en: 'fly at',
        description: 'Attack.'
    },
    {
        en: 'fly at',
        description: 'Criticise or shout angrily.'
    },
    {
        en: 'fly by',
        description: 'When time appears to move quickly.'
    },
    {
        en: 'fly into',
        description: 'Change emotion quickly.'
    },
    {
        en: 'fob off',
        description: 'Make or persuade someone to accept something.'
    },
    {
        en: 'fob off',
        description: 'Lie or deceive someone.'
    },
    {
        en: 'fob off on',
        description: 'Make or persuade someone to accept something you don\'t want.'
    },
    {
        en: 'fob off onto',
        description: 'Make or persuade someone to accept something you don\'t want.'
    },
    {
        en: 'fob off with',
        description: 'Make or persuade someone to accept something of lower quality than they wanted.'
    },
    {
        en: 'focus on',
        description: 'Concentrate.'
    },
    {
        en: 'fold up',
        description: 'Make a sheet of paper smaller.'
    },
    {
        en: 'follow on',
        description: 'Leave to meet someone after they have left the place you\'re at.'
    },
    {
        en: 'follow on',
        description: 'In cricket, if the second team to bat doesn\'t score enough runs, it has to bat again.'
    },
    {
        en: 'follow on from',
        description: 'Be the part of something.'
    },
    {
        en: 'follow through',
        description: 'Do what is necessary to complete something or make it successful.'
    },
    {
        en: 'follow through',
        description: 'Continue moving limbs after hitting a ball.'
    },
    {
        en: 'follow up',
        description: 'Do something to check or improve an earlier action.'
    },
    {
        en: 'follow up',
        description: 'Find our about a problem and act.'
    },
    {
        en: 'fool about',
        description: 'Not be serious.'
    },
    {
        en: 'fool about',
        description: 'Be unfaithful.'
    },
    {
        en: 'fool around',
        description: 'Not be serious.'
    },
    {
        en: 'fool around',
        description: 'Be unfaithful.'
    },
    {
        en: 'fool with',
        description: 'Play with something dangerous.'
    },
    {
        en: 'forge ahead',
        description: 'Make a lot of progress in a short time.'
    },
    {
        en: 'forge ahead',
        description: 'Move forwards very quickly.'
    },
    {
        en: 'freak out',
        description: 'Become very disturbed or angry.'
    },
    {
        en: 'free up',
        description: 'Make money or time available by not using it elsewhere.'
    },
    {
        en: 'free up',
        description: 'Do work or a task for someone to make them available for something.'
    },
    {
        en: 'freeze out',
        description: 'Shut out or exclude by unfriendly treatment.'
    },
    {
        en: 'freeze out',
        description: 'Force to retire or withdraw from membership, a job, etc.'
    },
    {
        en: 'freeze over',
        description: 'Become covered with ice (lake, river, pond, etc).'
    },
    {
        en: 'freeze up',
        description: 'Be blocked with ice.'
    },
    {
        en: 'freeze up',
        description: 'Stop working because the parts of a machine won\'t move.'
    },
    {
        en: 'freeze up',
        description: 'When a computer stops working.'
    },
    {
        en: 'freeze up',
        description: 'Be paralysed with fear.'
    },
    {
        en: 'freshen up',
        description: 'Wash quickly and improve appearance.'
    },
    {
        en: 'freshen up',
        description: 'Add more al*oh*l to a glass before it is empty.'
    },
    {
        en: 'freshen up',
        description: 'Quickly improve the appearance of something.'
    },
    {
        en: 'frighten away',
        description: 'Scare someone so much that they go  away.'
    },
    {
        en: 'frighten away',
        description: 'Scare or worry someone enough to stop them doing something they had planned.'
    },
    {
        en: 'frighten off',
        description: 'Scare someone so much that they go  away.'
    },
    {
        en: 'frighten off',
        description: 'Scare or worry someone enough to stop them doing something they had planned.'
    },
    {
        en: 'front for',
        description: 'Represent someone, especially when covering illegal or wrongful activities.'
    },
    {
        en: 'front off',
        description: 'Confront someone and let them know you are prepared to fight.'
    },
    {
        en: 'front onto',
        description: 'Face (of a building).'
    },
    {
        en: 'front out',
        description: 'Face up to someone, withstand criticism.'
    },
    {
        en: 'front up',
        description: 'Appear somewhere for a short time.'
    },
    {
        en: 'front up',
        description: 'Advance cash for something.'
    },
    {
        en: 'frown on',
        description: 'Disapprove.'
    },
    {
        en: 'fuel up',
        description: 'Put petrol or other fuel into a vehicle.'
    },
    {
        en: 'gad about',
        description: 'Visit a lot of different places for pleasure.'
    },
    {
        en: 'gad around',
        description: 'Visit different places for pleasure.'
    },
    {
        en: 'gag for',
        description: 'Want something a lot.'
    },
    {
        en: 'gang up',
        description: 'Form a group against something or someone.'
    },
    {
        en: 'gang up against',
        description: 'Harass, bully (in a group).'
    },
    {
        en: 'gang up on',
        description: 'Harass, bully.'
    },
    {
        en: 'gear to',
        description: 'Organise or arrange something  for a particular purpose, audience, etc. (Often passive).'
    },
    {
        en: 'gear towards',
        description: 'Organise or arrange something  for a particular purpose, audience, etc.'
    },
    {
        en: 'gear up',
        description: 'Get ready for a busy period.'
    },
    {
        en: 'geek out',
        description: 'Talk at length about computing.'
    },
    {
        en: 'get about',
        description: 'Visit many places.'
    },
    {
        en: 'get about',
        description: 'Become known.'
    },
    {
        en: 'get about',
        description: 'Walk or visit places.'
    },
    {
        en: 'get about',
        description: 'Have personal or s*x*al relationships with many people.'
    },
    {
        en: 'get above',
        description: 'Behave as if you are better or more important than others.'
    },
    {
        en: 'get across',
        description: 'Communicate successfully.'
    },
    {
        en: 'get across',
        description: 'Go from one side to the other.'
    },
    {
        en: 'get across',
        description: 'Move something from one side to the other.'
    },
    {
        en: 'get across to',
        description: 'Be convincing or make a good impression.'
    },
    {
        en: 'get after',
        description: 'Nag or exhort someone.'
    },
    {
        en: 'get after',
        description: 'Chase.'
    },
    {
        en: 'get ahead',
        description: 'Progress.'
    },
    {
        en: 'get ahead of',
        description: 'Move in front of.'
    },
    {
        en: 'get along',
        description: 'Have a good relationship.'
    },
    {
        en: 'get along',
        description: 'Leave.'
    },
    {
        en: 'get along',
        description: 'Progess.'
    },
    {
        en: 'get along in',
        description: 'Progress.'
    },
    {
        en: 'get along with',
        description: 'Have a good relationship with someone.'
    },
    {
        en: 'get along with',
        description: 'Deal with, handle.'
    },
    {
        en: 'get around',
        description: 'Become known.'
    },
    {
        en: 'get around',
        description: 'Visit many different places.'
    },
    {
        en: 'get around',
        description: 'Walk or go to places.'
    },
    {
        en: 'get around',
        description: 'Avoid a problem.'
    },
    {
        en: 'get around',
        description: 'Persuade, convince.'
    },
    {
        en: 'get around',
        description: 'Have personal relationships with many people.'
    },
    {
        en: 'get around to',
        description: 'Finally manage to do something, make the effort to do something.'
    },
    {
        en: 'get at',
        description: 'Criticise.'
    },
    {
        en: 'get at',
        description: 'Mean.'
    },
    {
        en: 'get at',
        description: 'Be able to reach, find, access.'
    },
    {
        en: 'get at',
        description: 'Use threats, payments, bribes, etc, to affect someone\'s testimony or decision.'
    },
    {
        en: 'get away',
        description: 'Escape.'
    },
    {
        en: 'get away',
        description: 'Go on holiday or for a short break.'
    },
    {
        en: 'get away',
        description: 'Move, leave somewhere.'
    },
    {
        en: 'get away from',
        description: 'Go somewhere different or do something different.'
    },
    {
        en: 'get away from',
        description: 'Start to talk about something that is not relevant to the discussion.'
    },
    {
        en: 'get away with',
        description: 'Not get caught, criticised or punished for doing something wrong.'
    },
    {
        en: 'get away with',
        description: 'Achieve something, despite not doing it correctly or properly.'
    },
    {
        en: 'get away!',
        description: 'An expression of disbelief.'
    },
    {
        en: 'get back',
        description: 'Return.'
    },
    {
        en: 'get back',
        description: 'Return something.'
    },
    {
        en: 'get back',
        description: 'Revenge.'
    },
    {
        en: 'get back',
        description: 'Move away.'
    },
    {
        en: 'get back at',
        description: 'Take revenge.'
    },
    {
        en: 'get back into',
        description: 'Start doing something after stopping for some time.'
    },
    {
        en: 'get back into',
        description: 'Find a new enthusiasm for something.'
    },
    {
        en: 'get back to',
        description: 'Respond to a contact.'
    },
    {
        en: 'get back to',
        description: 'Respond when you know the answer.'
    },
    {
        en: 'get back to',
        description: 'Start doing something again after an interruption.'
    },
    {
        en: 'get back together',
        description: 'Restart a relationship.'
    },
    {
        en: 'get behind',
        description: 'Support.'
    },
    {
        en: 'get behind with',
        description: 'Be late paying instalments for something..'
    },
    {
        en: 'get by',
        description: 'Have just enough money to live on.'
    },
    {
        en: 'get by',
        description: 'Not be noticed (problems, errors, etc).'
    },
    {
        en: 'get by on',
        description: 'Manage on a certain amount of money.'
    },
    {
        en: 'get by with',
        description: 'Have enough of something to do the job.'
    },
    {
        en: 'get down',
        description: 'Make someone depressed, unhappy, exhausted, etc..'
    },
    {
        en: 'get down',
        description: 'Write, record.'
    },
    {
        en: 'get down',
        description: 'Manage to swallow.'
    },
    {
        en: 'get down',
        description: 'Descend, leave a vehicle.'
    },
    {
        en: 'get down',
        description: 'Leave the table after eating.'
    },
    {
        en: 'get down',
        description: 'Reduce.'
    },
    {
        en: 'get down',
        description: 'Have an affair or s*x*al relations.'
    },
    {
        en: 'get down on',
        description: 'Criticise.'
    },
    {
        en: 'get down to',
        description: 'Start working seriously.'
    },
    {
        en: 'get down to',
        description: 'Enjoy something a lot.'
    },
    {
        en: 'get in',
        description: 'Arrange for someone to do a job in your home, workplace, etc.'
    },
    {
        en: 'get in',
        description: 'Arrive (train, plane, etc.).'
    },
    {
        en: 'get in',
        description: 'Arrive home.'
    },
    {
        en: 'get in',
        description: 'Enter a car or taxi.'
    },
    {
        en: 'get in',
        description: 'Buy or obtain supplies, like food.'
    },
    {
        en: 'get in',
        description: 'Arrive at work, school, home.'
    },
    {
        en: 'get in',
        description: 'Enter a building or place.'
    },
    {
        en: 'get in',
        description: 'Be elected.'
    },
    {
        en: 'get in',
        description: 'Manage to say or do.'
    },
    {
        en: 'get in',
        description: 'Be admitted to a university, club, etc.'
    },
    {
        en: 'get in',
        description: 'Bring inside a place.'
    },
    {
        en: 'get in',
        description: 'Submit, apply.'
    },
    {
        en: 'get in',
        description: 'Pay for drinks.'
    },
    {
        en: 'get in on',
        description: 'Become involved.'
    },
    {
        en: 'get in with',
        description: 'Become friendly with, ingratiate with.'
    },
    {
        en: 'get into',
        description: 'Become involved or interested.'
    },
    {
        en: 'get into',
        description: 'Become involved in something bad or criminal.'
    },
    {
        en: 'get into',
        description: 'Be accepted or admitted.'
    },
    {
        en: 'get into',
        description: 'Become or be accepted as a member.'
    },
    {
        en: 'get into',
        description: 'Start a habit or way of acting or behaving.'
    },
    {
        en: 'get into',
        description: 'Be small enough to wear something.'
    },
    {
        en: 'get into',
        description: 'Criticise.'
    },
    {
        en: 'get it',
        description: 'Be punished or scolded.'
    },
    {
        en: 'get it off',
        description: 'Have s*x.'
    },
    {
        en: 'get it off with',
        description: 'Have s*x with.'
    },
    {
        en: 'get it on',
        description: 'Become interested or excited.'
    },
    {
        en: 'get it on',
        description: 'Have s*x.'
    },
    {
        en: 'get it on with',
        description: 'Have s*x with.'
    },
    {
        en: 'get it together',
        description: 'Control things in your life to achieve your aims.'
    },
    {
        en: 'get it together',
        description: 'Begin a relationship.'
    },
    {
        en: 'get it up',
        description: 'Become aroused (of a man).'
    },
    {
        en: 'get off',
        description: 'Escape punishment.'
    },
    {
        en: 'get off',
        description: 'Leave a bus, train, etc..'
    },
    {
        en: 'get off',
        description: 'Finish, leave work.'
    },
    {
        en: 'get off',
        description: 'Start a journey.'
    },
    {
        en: 'get off',
        description: 'Help a baby or child sleep.'
    },
    {
        en: 'get off',
        description: 'Orgasm, have s*x.'
    },
    {
        en: 'get off',
        description: 'Manage to fire a gun.'
    },
    {
        en: 'get off',
        description: 'Stop talking on the phone.'
    },
    {
        en: 'get off',
        description: 'Write or send letters, messages, etc.'
    },
    {
        en: 'get off',
        description: 'Say or write something funny.'
    },
    {
        en: 'get off it',
        description: 'A way of expressing disbelief, or telling someone that they\'re wrong or have an incorrect opinion.'
    },
    {
        en: 'get off on',
        description: 'Enjoy a dr*g.'
    },
    {
        en: 'get off on',
        description: 'Become excited by.'
    },
    {
        en: 'get off with',
        description: 'Have casual s*x with.'
    },
    {
        en: 'get off!',
        description: 'Don\'t touch, leave alone.'
    },
    {
        en: 'get on',
        description: 'Continue doing something.'
    },
    {
        en: 'get on',
        description: 'Enter a bus, train, plane, etc..'
    },
    {
        en: 'get on',
        description: 'Make progress, deal with something with a reasonable degree of success.'
    },
    {
        en: 'get on',
        description: 'Have a good relationship.'
    },
    {
        en: 'get on',
        description: 'Become old, age.'
    },
    {
        en: 'get on',
        description: 'Be late or near an arranged time.'
    },
    {
        en: 'get on',
        description: 'Wear, fit.'
    },
    {
        en: 'get on',
        description: 'Leave.'
    },
    {
        en: 'get on at',
        description: 'Criticise unfairly.'
    },
    {
        en: 'get on for',
        description: 'Be near a time.'
    },
    {
        en: 'get on to',
        description: 'Start to suspect.'
    },
    {
        en: 'get on with',
        description: 'Have a good relationship.'
    },
    {
        en: 'get on with',
        description: 'Continue or start doing something.'
    },
    {
        en: 'get onto',
        description: 'Start discussing a topic.'
    },
    {
        en: 'get onto',
        description: 'Be elected, appointed.'
    },
    {
        en: 'get onto',
        description: 'Appear on the radio or TV.'
    },
    {
        en: 'get onto',
        description: 'Contact someone because you need or want them to do something.'
    },
    {
        en: 'get onto',
        description: 'Enter a plane, train, etc.'
    },
    {
        en: 'get out',
        description: 'Leave the house to visit place and socialise.'
    },
    {
        en: 'get out',
        description: 'Become known when people want it to remain secret.'
    },
    {
        en: 'get out',
        description: 'Leave a place, escape.'
    },
    {
        en: 'get out',
        description: 'Remove something from where it is stored to use it.'
    },
    {
        en: 'get out',
        description: 'Remove dirt or something unwanted.'
    },
    {
        en: 'get out',
        description: 'Publish, make available for the public to see or buy.'
    },
    {
        en: 'get out',
        description: 'Say what you want when it is difficult.'
    },
    {
        en: 'get out of',
        description: 'Avoid doing something you dislike.'
    },
    {
        en: 'get out of',
        description: 'Leave a car, van, etc..'
    },
    {
        en: 'get out of',
        description: 'Stop a regular activity or habit.'
    },
    {
        en: 'get out of',
        description: 'Make someone confess or tell the truth.'
    },
    {
        en: 'get out of',
        description: 'Make someone give something to you.'
    },
    {
        en: 'get out of',
        description: 'Derive pleasure or benefit from something.'
    },
    {
        en: 'get out of',
        description: 'Help someone avoid doing something.'
    },
    {
        en: 'get out!',
        description: 'Expression of disbelief.'
    },
    {
        en: 'get over',
        description: 'Recover from something, feel better.'
    },
    {
        en: 'get over',
        description: 'Solve, find a solution.'
    },
    {
        en: 'get over',
        description: 'Communicate, make people understand.'
    },
    {
        en: 'get over',
        description: 'Be shocked or surprised that something if real or true.'
    },
    {
        en: 'get over',
        description: 'Get to the other side.'
    },
    {
        en: 'get over',
        description: 'Come somewhere.'
    },
    {
        en: 'get over with',
        description: 'Do something unpleasant that has to be done rather than delaying it any more.'
    },
    {
        en: 'get round',
        description: 'Become known.'
    },
    {
        en: 'get round',
        description: 'Find a solution.'
    },
    {
        en: 'get round to',
        description: 'Finally manage to do something.'
    },
    {
        en: 'get around to',
        description: 'Finally manage to do something.'
    },
    {
        en: 'get through',
        description: 'Contact.'
    },
    {
        en: 'get through',
        description: 'Consume.'
    },
    {
        en: 'get through',
        description: 'Finish.'
    },
    {
        en: 'get through',
        description: 'Succeed in an exam or test.'
    },
    {
        en: 'get through',
        description: 'Help someone or something succeed or pass a test or exam.'
    },
    {
        en: 'get through',
        description: 'Endure or deal with a difficult experience.'
    },
    {
        en: 'get through',
        description: 'Be accepted or passed (laws, proposals, etc).'
    },
    {
        en: 'get through',
        description: 'Manage to pass.'
    },
    {
        en: 'get through',
        description: 'Arrive.'
    },
    {
        en: 'get through to',
        description: 'Make someone understand.'
    },
    {
        en: 'get through to',
        description: 'Contact, especially by phone.'
    },
    {
        en: 'get through to',
        description: 'Reach a stage in a competition.'
    },
    {
        en: 'get to',
        description: 'Annoy, irritate.'
    },
    {
        en: 'get to',
        description: 'Arrive.'
    },
    {
        en: 'get to',
        description: 'Start discussing a topic.'
    },
    {
        en: 'get to',
        description: 'Have the opportunity to do something.'
    },
    {
        en: 'get together',
        description: 'Meet socially.'
    },
    {
        en: 'get up',
        description: 'Get out of bed.'
    },
    {
        en: 'get up',
        description: 'Organise.'
    },
    {
        en: 'get up to',
        description: 'Do something wrong or naughty.'
    },
    {
        en: 'ghost away',
        description: 'Remove someone secretly of discreetly.'
    },
    {
        en: 'gin up',
        description: 'Boost, increase or exaggerate.'
    },
    {
        en: 'ginger up',
        description: 'Make more lively.'
    },
    {
        en: 'give away',
        description: 'Entrust your daughter to her husband through the marriage ceremony.'
    },
    {
        en: 'give away',
        description: 'Tell a secret, often unintentionally.'
    },
    {
        en: 'give away',
        description: 'Distribute something for free.'
    },
    {
        en: 'give away',
        description: 'Give without asking for or expecting payment.'
    },
    {
        en: 'give away',
        description: 'Give an advantage to your opponent in a sport by making a mistake, playing badly, etc.'
    },
    {
        en: 'give away',
        description: 'Give an unwanted baby to people to bring up.'
    },
    {
        en: 'give away',
        description: 'Betray, report to authorities.'
    },
    {
        en: 'give away',
        description: 'Give a weight advantage to an opponent in boxing.'
    },
    {
        en: 'give back',
        description: 'Return something you\'ve borrowed.'
    },
    {
        en: 'give back',
        description: 'Return something that someone has lost.'
    },
    {
        en: 'give in',
        description: 'Stop doing something because it\'s too hard or requires too much energy.'
    },
    {
        en: 'give in',
        description: 'Submit homework, etc..'
    },
    {
        en: 'give in',
        description: 'Surrender, accept defeat.'
    },
    {
        en: 'give in',
        description: 'Offer or submit for judgement, approval.'
    },
    {
        en: 'give in to',
        description: 'Agree to something you don\'t like.'
    },
    {
        en: 'give in to',
        description: 'Allow a feeling or desire to control you.'
    },
    {
        en: 'give it to',
        description: 'Criticise harshly or punish someone for something.'
    },
    {
        en: 'give it up for',
        description: 'Applaud.'
    },
    {
        en: 'give it up to',
        description: 'Applaud.'
    },
    {
        en: 'give of',
        description: 'Contribute without expecting anything in return, usually time or money.'
    },
    {
        en: 'give off',
        description: 'Emit pollution or something else unpleasant.'
    },
    {
        en: 'give off',
        description: 'Behave in a way that makes people think of you in a certain way.'
    },
    {
        en: 'give off',
        description: 'Expand.'
    },
    {
        en: 'give off',
        description: 'Follow or take one of 2 or more branches (instructions, in machine code) in writing a computer program (using system software for a programming language).'
    },
    {
        en: 'give onto',
        description: 'Open into a place, for a door or window.'
    },
    {
        en: 'give out',
        description: 'Distribute.'
    },
    {
        en: 'give out',
        description: 'Stop working, through age or overuse.'
    },
    {
        en: 'give out',
        description: 'Have no more of a supply.'
    },
    {
        en: 'give out',
        description: 'Make public.'
    },
    {
        en: 'give out',
        description: 'Emit.'
    },
    {
        en: 'give out',
        description: 'End or finish somewhere.'
    },
    {
        en: 'give out',
        description: 'Make a sound or noise.'
    },
    {
        en: 'give out',
        description: 'Read the wordings of a hymn or psalm aloud for congregational singing.'
    },
    {
        en: 'give over',
        description: 'Stop doing something bad or annoying.'
    },
    {
        en: 'give over',
        description: 'Entrust, pass on responsibility.'
    },
    {
        en: 'give over',
        description: 'Stop an activity.'
    },
    {
        en: 'give over to',
        description: 'Dedicate, devote.'
    },
    {
        en: 'give over to',
        description: 'Transfer responsibility.'
    },
    {
        en: 'give over!',
        description: 'An expression of disbelief.'
    },
    {
        en: 'give up',
        description: 'Stop doing something that has been a habit.'
    },
    {
        en: 'give up',
        description: 'Stop being friendly, end relationships.'
    },
    {
        en: 'give up',
        description: 'Stop doing something.'
    },
    {
        en: 'give up',
        description: 'Surrender, stop trying.'
    },
    {
        en: 'give up',
        description: 'Sacrifice or dedicate time, etc, to something.'
    },
    {
        en: 'give up',
        description: 'Allow someone to sit in your chair, take your place, etc.'
    },
    {
        en: 'give up',
        description: 'Allow or give away a run while pitching (baseball).'
    },
    {
        en: 'give up on',
        description: 'Lose faith in or stop believing in something or someone.'
    },
    {
        en: 'give up on',
        description: 'Stop feeling hope.'
    },
    {
        en: 'give up to',
        description: 'Denounce, report to authorities.'
    },
    {
        en: 'give way',
        description: 'Stop to allow vehicles to pass.'
    },
    {
        en: 'give way',
        description: 'Collapse, break.'
    },
    {
        en: 'give way to',
        description: 'Yield, surrender, retreat.'
    },
    {
        en: 'give way to',
        description: 'Relinquish position or ascendancy.'
    },
    {
        en: 'give way to',
        description: 'Be replaced by something better, cheaper, more modern, etc.'
    },
    {
        en: 'give way to',
        description: 'Allow a vehicle to pass in front.'
    },
    {
        en: 'give way to',
        description: 'Surrender to strong emotions.'
    },
    {
        en: 'give yourself up',
        description: 'Surrender to the police or authorities.'
    },
    {
        en: 'give yourself up to',
        description: 'Dedicate time, energy, etc,  to something.'
    },
    {
        en: 'gloss over',
        description: 'Try to minimise the importance of something.'
    },
    {
        en: 'gnaw at',
        description: 'Trouble, worry or annoy someone.'
    },
    {
        en: 'gnaw at',
        description: 'Harm gradually.'
    },
    {
        en: 'gnaw away at',
        description: 'Harm gradually.'
    },
    {
        en: 'go about',
        description: 'Deal with something.'
    },
    {
        en: 'go about',
        description: 'Circulate.'
    },
    {
        en: 'go across',
        description: 'Move to another side or place.'
    },
    {
        en: 'go after',
        description: 'Chase, try to get.'
    },
    {
        en: 'go against',
        description: 'Lose a decision or a verdict of a court.'
    },
    {
        en: 'go ahead',
        description: 'Proceed.'
    },
    {
        en: 'go ahead with',
        description: 'Proceed.'
    },
    {
        en: 'go along with',
        description: 'Accept a decision or suggestion.'
    },
    {
        en: 'go along with',
        description: 'Accompany.'
    },
    {
        en: 'go around',
        description: 'Circulate.'
    },
    {
        en: 'go around',
        description: 'Be or have enough of something.'
    },
    {
        en: 'go around',
        description: 'Visit.'
    },
    {
        en: 'go at',
        description: 'Attack or approach something with vigour.'
    },
    {
        en: 'go away',
        description: 'Leave a place or disappear.'
    },
    {
        en: 'go back',
        description: 'Have a long history.'
    },
    {
        en: 'go back',
        description: 'Return to, start doing something again.'
    },
    {
        en: 'go back on',
        description: 'Break a promise.'
    },
    {
        en: 'go before',
        description: 'Precede.'
    },
    {
        en: 'go below',
        description: 'Leave the top deck of a ship.'
    },
    {
        en: 'go by',
        description: 'The passing of time.'
    },
    {
        en: 'go by',
        description: 'Trust or depend on for correct information.'
    },
    {
        en: 'go by',
        description: 'Pay a short visit, call.'
    },
    {
        en: 'go down',
        description: 'Decrease, get smaller.'
    },
    {
        en: 'go down',
        description: 'Sink.'
    },
    {
        en: 'go down',
        description: 'Sunset.'
    },
    {
        en: 'go down',
        description: 'Be sent to to prison.'
    },
    {
        en: 'go down',
        description: 'Become recorded as or known as.'
    },
    {
        en: 'go down',
        description: 'Be eaten or swallowed.'
    },
    {
        en: 'go down',
        description: 'Fall to the ground.'
    },
    {
        en: 'go down',
        description: 'Happen, take place.'
    },
    {
        en: 'go down',
        description: 'Stop working, especially computers.'
    },
    {
        en: 'go down',
        description: 'Become dimmer.'
    },
    {
        en: 'go down',
        description: 'Be received by people, in terms of their reaction.'
    },
    {
        en: 'go down on',
        description: 'Perform oral s*x.'
    },
    {
        en: 'go down to',
        description: 'Be defeated.'
    },
    {
        en: 'go down with',
        description: 'Fall ill.'
    },
    {
        en: 'go down with',
        description: 'Find acceptance.'
    },
    {
        en: 'go for',
        description: 'Attack.'
    },
    {
        en: 'go for',
        description: 'Be attracted to.'
    },
    {
        en: 'go for',
        description: 'Choose, select.'
    },
    {
        en: 'go for',
        description: 'Try to get.'
    },
    {
        en: 'go for',
        description: 'Have something favourable.'
    },
    {
        en: 'go for',
        description: 'Pass for or serve as.'
    },
    {
        en: 'go for it',
        description: 'Be assertive and ready to initiate action (like \'attack\').'
    },
    {
        en: 'go forth',
        description: 'Leave a place.'
    },
    {
        en: 'go forth',
        description: 'Travel abroad, leave a place.'
    },
    {
        en: 'go forward',
        description: 'Move clocks ahead.'
    },
    {
        en: 'go forward',
        description: 'Progress.'
    },
    {
        en: 'go in',
        description: 'Go to hospital for treatment, surgery, etc..'
    },
    {
        en: 'go in',
        description: 'Fit.'
    },
    {
        en: 'go in',
        description: 'Disappear, become obscured by a cloud.'
    },
    {
        en: 'go in',
        description: 'Attack.'
    },
    {
        en: 'go in for',
        description: 'Enter a competition or sit an exam.'
    },
    {
        en: 'go in for',
        description: 'Support, advocate.'
    },
    {
        en: 'go in for',
        description: 'Like, have an interest in.'
    },
    {
        en: 'go in for',
        description: 'Make a career choice.'
    },
    {
        en: 'go in with',
        description: 'Form a union or alliance.'
    },
    {
        en: 'go in with',
        description: 'Join, enter.'
    },
    {
        en: 'go into',
        description: 'Discuss in some detail.'
    },
    {
        en: 'go into',
        description: 'Enter a profession, hospital, trade, market.'
    },
    {
        en: 'go into',
        description: 'Begin a speech or description.'
    },
    {
        en: 'go into',
        description: 'Be dedicated or devoted.'
    },
    {
        en: 'go into',
        description: 'Be contained in a larger number.'
    },
    {
        en: 'go it',
        description: 'Behave in a reckless way.'
    },
    {
        en: 'go it',
        description: 'Move or drive very fast.'
    },
    {
        en: 'go it alone',
        description: 'Do something without help.'
    },
    {
        en: 'go off',
        description: 'Explode (bomb), start ringing (alarm).'
    },
    {
        en: 'go off',
        description: 'Go bad.'
    },
    {
        en: 'go off',
        description: 'Start to dislike.'
    },
    {
        en: 'go off',
        description: 'Leave a place.'
    },
    {
        en: 'go off',
        description: 'Take place, follow a plan or pattern.'
    },
    {
        en: 'go off',
        description: 'Stop working (electric/electronic equipment).'
    },
    {
        en: 'go off with',
        description: 'Elope, run away with someone.'
    },
    {
        en: 'go off with',
        description: 'Steal.'
    },
    {
        en: 'go on',
        description: 'Continue.'
    },
    {
        en: 'go on',
        description: 'Happen.'
    },
    {
        en: 'go on',
        description: 'Start doing or taking something.'
    },
    {
        en: 'go on',
        description: 'Be guided.'
    },
    {
        en: 'go on',
        description: 'Be nearly a certain period of time.'
    },
    {
        en: 'go on',
        description: 'Progress.'
    },
    {
        en: 'go on',
        description: 'Spend money.'
    },
    {
        en: 'go on',
        description: 'Start working (electric/electronic equipment).'
    },
    {
        en: 'go on about',
        description: 'Talk too much.'
    },
    {
        en: 'go on at',
        description: 'Pester, try to make someone do something by repeatedly asking or suggesting.'
    },
    {
        en: 'go on to',
        description: 'Proceed.'
    },
    {
        en: 'go on with',
        description: 'Continue doing.'
    },
    {
        en: 'go one',
        description: 'A way of encouraging someone.'
    },
    {
        en: 'go out',
        description: 'Stop burning, be extinguished.'
    },
    {
        en: 'go out',
        description: 'Leave a place.'
    },
    {
        en: 'go out',
        description: 'Go on strike.'
    },
    {
        en: 'go out',
        description: 'Become infashionable.'
    },
    {
        en: 'go out',
        description: 'Move backwards, of a tide.'
    },
    {
        en: 'go out',
        description: 'Be eliminated in a competition.'
    },
    {
        en: 'go out',
        description: 'Be transmitted.'
    },
    {
        en: 'go out',
        description: 'Be sent.'
    },
    {
        en: 'go out',
        description: 'Intend.'
    },
    {
        en: 'go out for',
        description: 'Become a candidate, apply for something.'
    },
    {
        en: 'go out to',
        description: 'Feel sympathy with someone.'
    },
    {
        en: 'go out with',
        description: 'Have a relationship with.'
    },
    {
        en: 'go over',
        description: 'Look at something, revise.'
    },
    {
        en: 'go over',
        description: 'Visit.'
    },
    {
        en: 'go over',
        description: 'Be approved or accepted.'
    },
    {
        en: 'go over',
        description: 'Repeat or explain.'
    },
    {
        en: 'go over',
        description: 'Clean.'
    },
    {
        en: 'go over to',
        description: 'Go on a journey.'
    },
    {
        en: 'go over to',
        description: 'Become converted.'
    },
    {
        en: 'go over to',
        description: 'Change to something different.'
    },
    {
        en: 'go past',
        description: 'Pass without stopping.'
    },
    {
        en: 'go round',
        description: 'Be or have enough of something.'
    },
    {
        en: 'go round',
        description: 'Circulate.'
    },
    {
        en: 'go round',
        description: 'Visit.'
    },
    {
        en: 'go through',
        description: 'Experience.'
    },
    {
        en: 'go through',
        description: 'Read again.'
    },
    {
        en: 'go through',
        description: 'Examine, search.'
    },
    {
        en: 'go through',
        description: 'Do something in a certain way or following certain procedures.'
    },
    {
        en: 'go through',
        description: 'Explain.'
    },
    {
        en: 'go through',
        description: 'Be approved formally or sanctioned.'
    },
    {
        en: 'go through',
        description: 'Enter.'
    },
    {
        en: 'go through',
        description: 'Consume or spend.'
    },
    {
        en: 'go through',
        description: 'Perform or carry something out.'
    },
    {
        en: 'go through with',
        description: 'Do or complete something you\'ve agreed to.'
    },
    {
        en: 'go to',
        description: 'Allocate money.'
    },
    {
        en: 'go together',
        description: 'Harmonize or be compatible.'
    },
    {
        en: 'go towards',
        description: 'Contibute.'
    },
    {
        en: 'go under',
        description: 'Go bankrupt.'
    },
    {
        en: 'go under',
        description: 'Lose consciousness.'
    },
    {
        en: 'go under',
        description: 'Sink.'
    },
    {
        en: 'go up',
        description: 'Rise or climb.'
    },
    {
        en: 'go up',
        description: 'Approach.'
    },
    {
        en: 'go up',
        description: 'Be built.'
    },
    {
        en: 'go up',
        description: 'Be heard.'
    },
    {
        en: 'go up',
        description: 'Be promoted.'
    },
    {
        en: 'go up to',
        description: 'Approach.'
    },
    {
        en: 'go up to',
        description: 'Attend a university.'
    },
    {
        en: 'go up to',
        description: 'Reach.'
    },
    {
        en: 'go with',
        description: 'Combine nicely.'
    },
    {
        en: 'go with',
        description: 'Accompany.'
    },
    {
        en: 'go with',
        description: 'Accept, agree to.'
    },
    {
        en: 'go with',
        description: 'Date, have a relationship with.'
    },
    {
        en: 'go without',
        description: 'Not have.'
    },
    {
        en: 'go without',
        description: 'Cope without having something.'
    },
    {
        en: 'goof around',
        description: 'Fool around, not be serious.'
    },
    {
        en: 'goof off',
        description: 'Avoid or leave work.'
    },
    {
        en: 'goof up',
        description: 'Mess, spoil.'
    },
    {
        en: 'grasp at',
        description: 'Try to take hold of something quickly.'
    },
    {
        en: 'grasp at',
        description: 'Take an opportunity without hesitation.'
    },
    {
        en: 'grass on',
        description: 'Report someone to a person in authority.'
    },
    {
        en: 'grass up',
        description: 'Report someone to a person in authority.'
    },
    {
        en: 'grey out',
        description: 'Disable a function in a computer program, leaving it visible but not working.'
    },
    {
        en: 'grind away',
        description: 'Keep working at something.'
    },
    {
        en: 'grind down',
        description: 'Reduce or destroy someone\'s enthusiasm.'
    },
    {
        en: 'grind into',
        description: 'Press or twist something hard into something else.'
    },
    {
        en: 'grind on',
        description: 'Proceed relentlessly.'
    },
    {
        en: 'grind on',
        description: 'Talk endlessly.'
    },
    {
        en: 'grind out',
        description: 'Produce something with great difficulty.'
    },
    {
        en: 'grind up',
        description: 'Reduce to small pieces.'
    },
    {
        en: 'grow apart',
        description: 'Become distant, stop having a close relationship because time, distance, interests, etc, have changed.'
    },
    {
        en: 'grow away from',
        description: 'Become less friendly with.'
    },
    {
        en: 'grow back',
        description: 'Grow again.'
    },
    {
        en: 'grow from',
        description: 'Result from a process.'
    },
    {
        en: 'grow into',
        description: 'Grow to fit large clothes.'
    },
    {
        en: 'grow into',
        description: 'Mature or change into.'
    },
    {
        en: 'grow into',
        description: 'Develop or change over time to fit something.'
    },
    {
        en: 'grow on',
        description: 'Like something that you didn\'t like at first.'
    },
    {
        en: 'grow on',
        description: 'Have a greater influence or degree of acceptance.'
    },
    {
        en: 'grow on',
        description: 'Become gradually more evident.'
    },
    {
        en: 'grow out',
        description: 'Let hair, etc, with dyes, perms grow to get rid of the style.'
    },
    {
        en: 'grow out of',
        description: 'Grow too large for clothes.'
    },
    {
        en: 'grow out of',
        description: 'Lose interest as you grow older or become more mature.'
    },
    {
        en: 'grow out of',
        description: 'Result  or develop from.'
    },
    {
        en: 'grow to',
        description: 'Eventually do something.'
    },
    {
        en: 'grow together',
        description: 'Gradually become attached, united or close.'
    },
    {
        en: 'grow up',
        description: 'Mature, become adult.'
    },
    {
        en: 'grow up',
        description: 'Arise, emerge.'
    },
    {
        en: 'grow up',
        description: 'Develop in a place or for a reason (city, town, etc).'
    },
    {
        en: 'grow up on',
        description: 'Do or have something when you are a child.'
    },
    {
        en: 'grow upon',
        description: 'Like something that you didn\'t like at first.'
    },
    {
        en: 'grow upon',
        description: 'Have a greater influence or degree of acceptance.'
    },
    {
        en: 'grow upon',
        description: 'Become gradually more evident.'
    },
    {
        en: 'gun for',
        description: 'Try to destroy an opponent.'
    },
    {
        en: 'gussy up',
        description: 'Dress smartly or improve the appearance of something.'
    },
    {
        en: 'hack around',
        description: 'Waste time.'
    },
    {
        en: 'hack into',
        description: 'Break into a computer system.'
    },
    {
        en: 'hack off',
        description: 'Annoy.'
    },
    {
        en: 'hack up',
        description: 'Chop or  cut into small  pieces.'
    },
    {
        en: 'hack up',
        description: 'Expel by coughing.'
    },
    {
        en: 'ham up',
        description: 'Perform or act in an excessive way to attract attention or amuse people.'
    },
    {
        en: 'hammer away at',
        description: 'Work relentlessly.'
    },
    {
        en: 'hammer into',
        description: 'Repeat something over a period of time to make someone remember it.'
    },
    {
        en: 'hammer out',
        description: 'Negotiate and reach an agreement.'
    },
    {
        en: 'hand back',
        description: 'Return.'
    },
    {
        en: 'hand down',
        description: 'Pass on to the next generation.'
    },
    {
        en: 'hand down',
        description: 'Give a formal decision.'
    },
    {
        en: 'hand in',
        description: 'Submit work for appraisal.'
    },
    {
        en: 'hand on',
        description: 'Give to someone else.'
    },
    {
        en: 'hand on',
        description: 'Transmit knowledge to the next generation.'
    },
    {
        en: 'hand out',
        description: 'Distribute.'
    },
    {
        en: 'hand over',
        description: 'Give.'
    },
    {
        en: 'hang about',
        description: 'Spend time somewhere not doing much.'
    },
    {
        en: 'hang about!',
        description: 'Stop what you\'re doing and pay attention to me.'
    },
    {
        en: 'hang around',
        description: 'Stay in a place.'
    },
    {
        en: 'hang back',
        description: 'Not move forwards to avoid doing something.'
    },
    {
        en: 'hang back from',
        description: 'Delay or avoid doing something.'
    },
    {
        en: 'hang in there',
        description: 'Persevere, not give up.'
    },
    {
        en: 'hang it up',
        description: 'Retire, quit.'
    },
    {
        en: 'hang on',
        description: 'Wait.'
    },
    {
        en: 'hang on',
        description: 'Hold tightly.'
    },
    {
        en: 'hang onto',
        description: 'Keep.'
    },
    {
        en: 'hang out',
        description: 'Spend time socially.'
    },
    {
        en: 'hang out for',
        description: 'Wait or refuse to do something until you get what you want.'
    },
    {
        en: 'hang over',
        description: 'Worry or trouble.'
    },
    {
        en: 'hang together',
        description: 'Work together when things are difficult.'
    },
    {
        en: 'hang up',
        description: 'End a phone call.'
    },
    {
        en: 'hang up on',
        description: 'End a phone call with someone.'
    },
    {
        en: 'hang with',
        description: 'Spend time with.'
    },
    {
        en: 'hanker after',
        description: 'Want something a lot, especially if you shouldn\'t want it or can\'t have it.'
    },
    {
        en: 'hanker for',
        description: 'Want something a lot, especially if you shouldn\'t want it or can\'t have it.'
    },
    {
        en: 'harp on',
        description: 'Talk repeatedly about something.'
    },
    {
        en: 'hate on',
        description: 'Be jealous, abuse or have an active hatred of someone.'
    },
    {
        en: 'have against',
        description: 'Dislike, disagree or hold a grudge (Usually negative).'
    },
    {
        en: 'have around',
        description: 'Entertain someone in your home.'
    },
    {
        en: 'have down as',
        description: 'Think of someone or something in a particular way.'
    },
    {
        en: 'have in',
        description: 'Have a supply of something in a particular place.'
    },
    {
        en: 'have in',
        description: 'Get someone to do some work.'
    },
    {
        en: 'have in',
        description: 'Entertain people in your home.'
    },
    {
        en: 'have it away',
        description: 'Have s*x with someone, especially casual s*x.'
    },
    {
        en: 'have it in for',
        description: 'Hold a grudge.'
    },
    {
        en: 'have it off',
        description: 'Have s*x.'
    },
    {
        en: 'have it out with',
        description: 'Discuss or argue an issue to improve a situation.'
    },
    {
        en: 'have off',
        description: 'Take time off work.'
    },
    {
        en: 'have on',
        description: 'Be wearing.'
    },
    {
        en: 'have on',
        description: 'Have an electronic device switched on.'
    },
    {
        en: 'have on',
        description: 'Have an arrangement.'
    },
    {
        en: 'have on',
        description: 'Tease, deceive.'
    },
    {
        en: 'have on',
        description: 'Be in possession at a particular time.'
    },
    {
        en: 'have on',
        description: 'Know something about someone that could harm them.'
    },
    {
        en: 'have over',
        description: 'Receive a guest.'
    },
    {
        en: 'have round',
        description: 'Entertain someone in your home.'
    },
    {
        en: 'have up',
        description: 'Make someone appear in court.'
    },
    {
        en: 'head for',
        description: 'Move or travel towards.'
    },
    {
        en: 'head off',
        description: 'Stop someone or force them to change direction.'
    },
    {
        en: 'head off',
        description: 'Prevent something bad happening.'
    },
    {
        en: 'head off',
        description: 'Leave somewhere to go to another place.'
    },
    {
        en: 'head out',
        description: 'Go out.'
    },
    {
        en: 'head up',
        description: 'Be in charge.'
    },
    {
        en: 'hear about',
        description: 'Get to know some information.'
    },
    {
        en: 'hear from',
        description: 'Receive a phone call, email, letter or other communication from someone.'
    },
    {
        en: 'hear of',
        description: 'Know of something or someone\'s existence.'
    },
    {
        en: 'hear of',
        description: 'Receive news, updates or information about someone.'
    },
    {
        en: 'hear of',
        description: 'In the negative, this can mean that someone refuse to accept, allow or acknowledge something.'
    },
    {
        en: 'hear out',
        description: 'Listen to everything someone has to say.'
    },
    {
        en: 'heat up',
        description: 'Make food hot.'
    },
    {
        en: 'help out',
        description: 'Give assistance.'
    },
    {
        en: 'hide away',
        description: 'Put something in a place where it won\'t be found.'
    },
    {
        en: 'hide away',
        description: 'Go or stay somewhere where you  won\'t be found or away from people.'
    },
    {
        en: 'hide out',
        description: 'Go or stay somewhere to avoid being caught or found.'
    },
    {
        en: 'hinge on',
        description: 'Depend very much or completely.'
    },
    {
        en: 'hinge on',
        description: 'Be an essential point for the development of a story.'
    },
    {
        en: 'hinge upon',
        description: 'Depend very much or completely.'
    },
    {
        en: 'hit back',
        description: 'Attack or criticise.'
    },
    {
        en: 'hit for',
        description: 'Get someone to pay or donate money.'
    },
    {
        en: 'hit it off',
        description: 'Have a good relationship from the first time you meet a person.'
    },
    {
        en: 'hit it off with',
        description: 'Like someone from the first time you meet them.'
    },
    {
        en: 'hit on',
        description: 'Have an idea.'
    },
    {
        en: 'hit on',
        description: 'Talk to someone to try to attract them s*xu*lly.'
    },
    {
        en: 'hit on',
        description: 'Ask for money.'
    },
    {
        en: 'hit out at',
        description: 'Respond angrily to criticism.'
    },
    {
        en: 'hit up',
        description: 'Inject dr*gs.'
    },
    {
        en: 'hit up',
        description: 'Ask someone for some money.'
    },
    {
        en: 'hit up on',
        description: 'Inject dr*gs.'
    },
    {
        en: 'hit upon',
        description: 'Have an idea.'
    },
    {
        en: 'hit upon',
        description: 'Try to attract someone s*xu*lly.'
    },
    {
        en: 'hit with',
        description: 'Surprise someone with some information or news.'
    },
    {
        en: 'hive off',
        description: 'Separate part of  a company or service, often by selling it.'
    },
    {
        en: 'hold against',
        description: 'Have a grudge against someone, or little respect.'
    },
    {
        en: 'hold back',
        description: 'Not show emotion.'
    },
    {
        en: 'hold back',
        description: 'Prevent something moving forwards or progressing.'
    },
    {
        en: 'hold back',
        description: 'Not disclose information or make it public.'
    },
    {
        en: 'hold back from',
        description: 'Not allow yourself to do something.'
    },
    {
        en: 'hold down',
        description: 'Keep a job.'
    },
    {
        en: 'hold down',
        description: 'Stop someone or something from moving.'
    },
    {
        en: 'hold forth',
        description: 'State your opinions about something, especially when talking for a long time and boringly.'
    },
    {
        en: 'hold off',
        description: 'When bad weather doesn\'t appear.'
    },
    {
        en: 'hold off',
        description: 'Stop someone from attacking or beating you.'
    },
    {
        en: 'hold on',
        description: 'Wait.'
    },
    {
        en: 'hold on',
        description: 'To hold tightly.'
    },
    {
        en: 'hold on to',
        description: 'Hold tightly.'
    },
    {
        en: 'hold onto',
        description: 'Keep as long as possible.'
    },
    {
        en: 'hold onto',
        description: 'Hold tightly.'
    },
    {
        en: 'hold out',
        description: 'Resist.'
    },
    {
        en: 'hold out',
        description: 'Hold in front of you.'
    },
    {
        en: 'hold out against',
        description: 'Try to reject.'
    },
    {
        en: 'hold out for',
        description: 'Wait for something better or refuse something now for something better in the future.'
    },
    {
        en: 'hold out on',
        description: 'Not pay someone or give them information.'
    },
    {
        en: 'hold over',
        description: 'Delay.'
    },
    {
        en: 'hold over',
        description: 'To continue something for longer than planned.'
    },
    {
        en: 'hold together',
        description: 'Not break up.'
    },
    {
        en: 'hold up',
        description: 'Delay when travelling.'
    },
    {
        en: 'hold up',
        description: 'Rob with violence or threats thereof.'
    },
    {
        en: 'hold with',
        description: 'Accept (usually negative).'
    },
    {
        en: 'hole up',
        description: 'Hide to avoid detection or an unpleasant situation.'
    },
    {
        en: 'home in on',
        description: 'Target.'
    },
    {
        en: 'hone in on',
        description: 'Target, focus.'
    },
    {
        en: 'hook into',
        description: 'Persuade someone to do something they don\'t want to do.'
    },
    {
        en: 'hook up',
        description: 'Meet someone.'
    },
    {
        en: 'hook up to',
        description: 'Connect to a machine.'
    },
    {
        en: 'hoon around',
        description: 'Act in a dangerous or reckless way, especially when driving fast.'
    },
    {
        en: 'horse around',
        description: 'Not be serious.'
    },
    {
        en: 'hose down',
        description: 'Use a hose to wet, clean or wash something.'
    },
    {
        en: 'hose down',
        description: 'Invest heavily in or throw a lot of money at something.'
    },
    {
        en: 'hound out',
        description: 'Force someone out of a place, job, position, etc..'
    },
    {
        en: 'hover around',
        description: 'Move about a place.'
    },
    {
        en: 'hunker down',
        description: 'Settle in a place as comfortably as possible to stay there.'
    },
    {
        en: 'hunt down',
        description: 'Search for someone to punish or kill them.'
    },
    {
        en: 'hunt out',
        description: 'Search until you find something.'
    },
    {
        en: 'hunt up',
        description: 'Search for and manage to find something.'
    },
    {
        en: 'hush up',
        description: 'Try to keep something bad from becoming widely known.'
    },
    {
        en: 'iron out',
        description: 'Remove small problems or irregularities.'
    },
    {
        en: 'issue forth',
        description: 'Come out of a place.'
    },
    {
        en: 'jabber away',
        description: 'Talk fast or incomprehensibly.'
    },
    {
        en: 'jack around',
        description: 'Make trouble for someone, fail to keep promises.'
    },
    {
        en: 'jack in',
        description: 'Quit, give up.'
    },
    {
        en: 'jack up',
        description: 'Raise a car to be able to do mechanical work.'
    },
    {
        en: 'jack up',
        description: 'Increase sharply.'
    },
    {
        en: 'jam on',
        description: 'Apply or operate something forcefully.'
    },
    {
        en: 'jaw away',
        description: 'Talk just for the point of talking rather than having anything to say.'
    },
    {
        en: 'jazz up',
        description: 'Make something more interesting or attractive.'
    },
    {
        en: 'jerk around',
        description: 'Cause someone trouble, treat someone badly.'
    },
    {
        en: 'jerk around',
        description: 'Behave stupidly.'
    },
    {
        en: 'jerk off',
        description: 'Waste time doing unimportant things.'
    },
    {
        en: 'joke around',
        description: 'Be funny, or try to.'
    },
    {
        en: 'jot down',
        description: 'Make a quick note.'
    },
    {
        en: 'juice up',
        description: 'Make something more exciting or perform better.'
    },
    {
        en: 'jump at',
        description: 'Accept eagerly.'
    },
    {
        en: 'jump in',
        description: 'Enter a conversation.'
    },
    {
        en: 'jump off',
        description: 'Start quickly, often well.'
    },
    {
        en: 'jump on',
        description: 'Criticize, attack.'
    },
    {
        en: 'keel over',
        description: 'Turn upside down.'
    },
    {
        en: 'keel over',
        description: 'Surrender, give in.'
    },
    {
        en: 'keel over',
        description: 'Fall to the ground.'
    },
    {
        en: 'keep around',
        description: 'Keep something near you.'
    },
    {
        en: 'keep at',
        description: 'Continue with something difficult.'
    },
    {
        en: 'keep away',
        description: 'Don\'t allow someone near something.'
    },
    {
        en: 'keep back',
        description: 'Maintain a safe distance.'
    },
    {
        en: 'keep down',
        description: 'Not vomit.'
    },
    {
        en: 'keep from',
        description: 'Control yourself, refrain.'
    },
    {
        en: 'keep in',
        description: 'Not allow someone out.'
    },
    {
        en: 'keep off',
        description: 'Not talk about.'
    },
    {
        en: 'keep off',
        description: 'Not tread on something.'
    },
    {
        en: 'keep on',
        description: 'Continue.'
    },
    {
        en: 'keep out',
        description: 'Not allow someone to enter.'
    },
    {
        en: 'keep to',
        description: 'Stay within limits.'
    },
    {
        en: 'keep up',
        description: 'Not let someone go to bed.'
    },
    {
        en: 'keep up',
        description: 'Maintain a continuous action, persist.'
    },
    {
        en: 'keep up at',
        description: 'Continue, not quit.'
    },
    {
        en: 'keep up with',
        description: 'Move at the same rate.'
    },
    {
        en: 'keep up with',
        description: 'Stay up to date.'
    },
    {
        en: 'key down',
        description: 'Relax, unwind.'
    },
    {
        en: 'key in',
        description: 'Enter numbers or information into a computer or electronic system.'
    },
    {
        en: 'key in on',
        description: 'Focus attention on, single out.'
    },
    {
        en: 'key on',
        description: 'Target, focus on (sport).'
    },
    {
        en: 'key to',
        description: 'Plan things to fit or suit people or situations.'
    },
    {
        en: 'key up',
        description: 'Make someone excited or nervous.'
    },
    {
        en: 'kick about',
        description: 'Discuss.'
    },
    {
        en: 'kick around',
        description: 'Discuss.'
    },
    {
        en: 'kick around with',
        description: 'Spend time with.'
    },
    {
        en: 'kick back',
        description: 'Pay someone illegally as part of the price.'
    },
    {
        en: 'kick back',
        description: 'Resist.'
    },
    {
        en: 'kick back',
        description: 'Relax.'
    },
    {
        en: 'kick down',
        description: 'Break something with your feet.'
    },
    {
        en: 'kick in',
        description: 'When a dr*g starts to take effect.'
    },
    {
        en: 'kick in',
        description: 'Break something with your feet.'
    },
    {
        en: 'kick in',
        description: 'Contribute money.'
    },
    {
        en: 'kick in',
        description: 'Start having an effect.'
    },
    {
        en: 'kick off',
        description: 'Start a game of football.'
    },
    {
        en: 'kick off',
        description: 'Die.'
    },
    {
        en: 'kick off',
        description: 'When trouble starts.'
    },
    {
        en: 'kick off',
        description: 'Argue, protest and refuse to co-operate.'
    },
    {
        en: 'kick out',
        description: 'Expel.'
    },
    {
        en: 'kick up',
        description: 'Cause trouble or pain.'
    },
    {
        en: 'kill off',
        description: 'Reduce or exterminate a population by hunting, pollution, development, etc..'
    },
    {
        en: 'kip down',
        description: 'Sleep away from your home, often without planning to.'
    },
    {
        en: 'kip down on',
        description: 'Sleep on something other than a bed.'
    },
    {
        en: 'kiss off',
        description: 'Used to tell someone to go away.'
    },
    {
        en: 'kiss off',
        description: 'Consider something to be unimportant or inferior.'
    },
    {
        en: 'kiss up to',
        description: 'Try to get into someone\'s favour.'
    },
    {
        en: 'knock about',
        description: 'Beat someone.'
    },
    {
        en: 'knock around',
        description: 'Discuss casually.'
    },
    {
        en: 'knock back',
        description: 'Cost someone a lot of money.'
    },
    {
        en: 'knock back',
        description: 'Finish a drink quickly, drink a lot of al*oh*l.'
    },
    {
        en: 'knock back',
        description: 'Shock.'
    },
    {
        en: 'knock down',
        description: 'Demolish.'
    },
    {
        en: 'knock down',
        description: 'Hit and injure someone.'
    },
    {
        en: 'knock it off!',
        description: 'Stop doing something annoying.'
    },
    {
        en: 'knock off',
        description: 'Finish work for the day.'
    },
    {
        en: 'knock off',
        description: 'Reduce the price of something.'
    },
    {
        en: 'knock off',
        description: 'Reduce the time required to do something.'
    },
    {
        en: 'knock off',
        description: 'Steal.'
    },
    {
        en: 'knock off',
        description: 'Produce or create something quickly.'
    },
    {
        en: 'knock out',
        description: 'Hit and make somebody unconscious.'
    },
    {
        en: 'knock out',
        description: 'Sell, distribute.'
    },
    {
        en: 'knock together',
        description: 'Join houses that had been separate.'
    },
    {
        en: 'knock up',
        description: 'Become or get someone pregnant..'
    },
    {
        en: 'knock up',
        description: 'Play a bit before a match to get ready.'
    },
    {
        en: 'knock up',
        description: 'Produce or create something quickly.'
    },
    {
        en: 'knuckle down',
        description: 'Make a great effort.'
    },
    {
        en: 'knuckle under',
        description: 'Submit to authority.'
    },
    {
        en: 'land in',
        description: 'Get someone into trouble.'
    },
    {
        en: 'land up in',
        description: 'Arrive, end a journey in a place, often without planning.'
    },
    {
        en: 'land with',
        description: 'Create a problem for someone.'
    },
    {
        en: 'lap up',
        description: 'Appreciate something.'
    },
    {
        en: 'large it up',
        description: 'Have a good time when intoxicated.'
    },
    {
        en: 'lark about',
        description: 'Behave in a silly way.'
    },
    {
        en: 'lark around',
        description: 'Behave in a silly way.'
    },
    {
        en: 'lark it up',
        description: 'Enjoy yourself noisily and exuberantly.'
    },
    {
        en: 'lash down',
        description: 'Fall heavily (rain).'
    },
    {
        en: 'lash down',
        description: 'Secure something with ropes or cords.'
    },
    {
        en: 'lash into',
        description: 'Criticise someone strongly.'
    },
    {
        en: 'lash out',
        description: 'Suddenly become violent.'
    },
    {
        en: 'lash out',
        description: 'React angrily.'
    },
    {
        en: 'lash out',
        description: 'Spend a lot of money on luxuries.'
    },
    {
        en: 'lash out against',
        description: 'Criticise something strongly.'
    },
    {
        en: 'lash out at',
        description: 'Hit someone suddenly, usually without warning, or try to hit them.'
    },
    {
        en: 'lash out at',
        description: 'Criticise someone or shout at them.'
    },
    {
        en: 'lash out on',
        description: 'Spend a lot of money buying something.'
    },
    {
        en: 'latch on',
        description: 'Understand, often after a long time.'
    },
    {
        en: 'latch on to',
        description: 'Understand something, often after a long time.'
    },
    {
        en: 'latch onto',
        description: 'Connect to something.'
    },
    {
        en: 'latch onto',
        description: 'Decide or realise that something is good or profitable.'
    },
    {
        en: 'laugh off',
        description: 'Pretend something (an injury, news, etc.) isnt important.'
    },
    {
        en: 'lay down',
        description: 'Establish rules or procedures.'
    },
    {
        en: 'lay down',
        description: 'Kill, murder.'
    },
    {
        en: 'lay into',
        description: 'Criticise angrily.'
    },
    {
        en: 'lay off',
        description: 'Make an employee redundant.'
    },
    {
        en: 'lay on',
        description: 'Organise, supply.'
    },
    {
        en: 'lay out',
        description: 'Spend money.'
    },
    {
        en: 'lead on',
        description: 'Falsely or cruelly raise hopes.'
    },
    {
        en: 'lead to',
        description: 'Result in.'
    },
    {
        en: 'leak out',
        description: 'Become public knowledge.'
    },
    {
        en: 'lean on',
        description: 'Put pressure on someone to get them to do what you want.'
    },
    {
        en: 'leap at',
        description: 'Take an opportunity enthusiastically.'
    },
    {
        en: 'leap on',
        description: 'Show interest in or try to use something to your advantage.'
    },
    {
        en: 'leap out at',
        description: 'Be very noticeable.'
    },
    {
        en: 'leap upon',
        description: 'Show interest in or try to use something to your advantage.'
    },
    {
        en: 'leave on',
        description: 'Not turn off.'
    },
    {
        en: 'leave out',
        description: 'Not include.'
    },
    {
        en: 'let down',
        description: 'Disappoint, fail to keep an arrangement.'
    },
    {
        en: 'let down',
        description: 'Make clothes longer.'
    },
    {
        en: 'let in',
        description: 'Allow someone to enter.'
    },
    {
        en: 'let off',
        description: 'Not punish.'
    },
    {
        en: 'let on',
        description: 'Tell a secret.'
    },
    {
        en: 'let out',
        description: 'Allow to leave or go out.'
    },
    {
        en: 'let out',
        description: 'Make a sound.'
    },
    {
        en: 'let out',
        description: 'Make clothes bigger.'
    },
    {
        en: 'level off',
        description: 'Stabilize the altitude of an airplane.'
    },
    {
        en: 'level out',
        description: 'Stabilize the altitude of an airplane.'
    },
    {
        en: 'lie around',
        description: 'Act in a lazy or unproductive way.'
    },
    {
        en: 'lie down',
        description: 'Rest.'
    },
    {
        en: 'lie with',
        description: 'Have the right to make a decision.'
    },
    {
        en: 'lift off',
        description: 'Leave the ground- rocket or spaceship.'
    },
    {
        en: 'light out',
        description: 'Leave suddenly.'
    },
    {
        en: 'light up',
        description: 'Light or start smoking a cigarette.'
    },
    {
        en: 'light up',
        description: 'Illuminate.'
    },
    {
        en: 'lighten up',
        description: 'Be less serious.'
    },
    {
        en: 'limber up',
        description: 'Do some exercises to warm up before playing a sport or other physical activity.'
    },
    {
        en: 'limber up for',
        description: 'Prepare for something that will require a great effort.'
    },
    {
        en: 'line up',
        description: 'Arrange in a line.'
    },
    {
        en: 'line up',
        description: 'Arrange something in a line.'
    },
    {
        en: 'line up',
        description: 'Arrange events for someone.'
    },
    {
        en: 'link up',
        description: 'Connect, join.'
    },
    {
        en: 'link up with',
        description: 'Connect with someone or contact them.'
    },
    {
        en: 'listen out for',
        description: 'Listen for a particular noise or sound.'
    },
    {
        en: 'listen up',
        description: 'Pay attention (often used as a command).'
    },
    {
        en: 'live by',
        description: 'Follow a belief system to guide your behaviour.'
    },
    {
        en: 'live down',
        description: 'Stop being embarrassed about something.'
    },
    {
        en: 'live for',
        description: 'Believe something is extremely important.'
    },
    {
        en: 'live in',
        description: 'Live in the place where you work or study..'
    },
    {
        en: 'live it up',
        description: 'Have a good time by spending a lot of money.'
    },
    {
        en: 'live off',
        description: 'Use money earned.'
    },
    {
        en: 'live off',
        description: 'Be financially supported.'
    },
    {
        en: 'live on',
        description: 'Use money for basic necessities.'
    },
    {
        en: 'live on',
        description: 'Not be forgotten.'
    },
    {
        en: 'live out',
        description: 'Stay somewhere until you die.'
    },
    {
        en: 'live out',
        description: 'Fulfill an ambition or fantasy.'
    },
    {
        en: 'live out',
        description: 'Not live at the place where you study or work.'
    },
    {
        en: 'live through',
        description: 'Experience different times.'
    },
    {
        en: 'live together',
        description: 'Have a relationship and live in the same place without marrying.'
    },
    {
        en: 'live up to',
        description: 'Meet expectations or standards.'
    },
    {
        en: 'live with',
        description: 'Accept something unpleasant.'
    },
    {
        en: 'live with',
        description: 'Have a relationship and live in the same place without marrying.'
    },
    {
        en: 'load down',
        description: 'Burden.'
    },
    {
        en: 'load up',
        description: 'Take illegal dr*gs.'
    },
    {
        en: 'load up',
        description: 'Fill a machine or vehicle.'
    },
    {
        en: 'load up on',
        description: 'Consume a lot of something for a particular purpose.'
    },
    {
        en: 'lock away',
        description: 'Lock in a safe place.'
    },
    {
        en: 'lock away',
        description: 'Put someone in prison or a mental hospital for a very long time.'
    },
    {
        en: 'lock down',
        description: 'Make very secure.'
    },
    {
        en: 'lock in',
        description: 'Lock a place to stop someone leaving.'
    },
    {
        en: 'lock in',
        description: 'Commit someone in such a way that they cannot leave.'
    },
    {
        en: 'lock onto',
        description: 'Find a target and head for it.'
    },
    {
        en: 'lock out',
        description: 'Close a workplace to stop workers entering.'
    },
    {
        en: 'lock out',
        description: 'Lock a place to stop someone getting in.'
    },
    {
        en: 'lock up',
        description: 'Close all doors, windows, etc..'
    },
    {
        en: 'lock up',
        description: 'Lock something in a safe place.'
    },
    {
        en: 'lock up',
        description: 'Put in prison or a mental hospital.'
    },
    {
        en: 'lock yourself away',
        description: 'Go somewhere away from people to study or work.'
    },
    {
        en: 'log in',
        description: 'Enter a restricted area on a computer system.'
    },
    {
        en: 'log into',
        description: 'Enter a restricted area of a computer system.'
    },
    {
        en: 'log off',
        description: 'Exit a computer system.'
    },
    {
        en: 'log on',
        description: 'Enter a computer system.'
    },
    {
        en: 'log out',
        description: 'Exit a computer system.'
    },
    {
        en: 'look after',
        description: 'Take care.'
    },
    {
        en: 'look back',
        description: 'Think about the past.'
    },
    {
        en: 'look down on',
        description: 'Have a low opinion of.'
    },
    {
        en: 'look for',
        description: 'Try to find.'
    },
    {
        en: 'look forward to',
        description: 'Wait for or anticipate something pleasant.'
    },
    {
        en: 'look in',
        description: 'Make a quick visit.'
    },
    {
        en: 'look in on',
        description: 'Visit briefly to see if everything\'s all right.'
    },
    {
        en: 'look into',
        description: 'Research, investigate.'
    },
    {
        en: 'look on',
        description: 'Watch something like a crime without helping.'
    },
    {
        en: 'look on as',
        description: 'Consider, regard.'
    },
    {
        en: 'look out',
        description: 'Be careful.'
    },
    {
        en: 'look out for',
        description: 'Take care of someone, make sure someone is cared for.'
    },
    {
        en: 'look out for',
        description: 'Keep alert and try to see.'
    },
    {
        en: 'look over',
        description: 'Inspect.'
    },
    {
        en: 'look round',
        description: 'Inspect a house.'
    },
    {
        en: 'look through',
        description: 'Read quickly.'
    },
    {
        en: 'look to',
        description: 'Expect, hope.'
    },
    {
        en: 'look up',
        description: 'Consult a reference work (dictionary, phonebook, etc.) for a specific piece of information..'
    },
    {
        en: 'look up',
        description: 'Improve.'
    },
    {
        en: 'look up',
        description: 'Find, trace an old friend.'
    },
    {
        en: 'look up to',
        description: 'Respect.'
    },
    {
        en: 'look upon as',
        description: 'Consider, regard.'
    },
    {
        en: 'loosen up',
        description: 'Become more relaxed or comfortable.'
    },
    {
        en: 'lord it over',
        description: 'Behave in a superior manner.'
    },
    {
        en: 'lose out',
        description: 'Be at a disadvantage.'
    },
    {
        en: 'lose out on',
        description: 'Not gain or have something advantageous.'
    },
    {
        en: 'lose out to',
        description: 'Be less successful.'
    },
    {
        en: 'luck into',
        description: 'Get something by chance.'
    },
    {
        en: 'luck out',
        description: 'Be very lucky.'
    },
    {
        en: 'lust after',
        description: 'Be attracted s*xu*lly.'
    },
    {
        en: 'lust after',
        description: 'Want something very much.'
    },
    {
        en: 'magic away',
        description: 'Make something disappear quickly.'
    },
    {
        en: 'make after',
        description: 'Chase.'
    },
    {
        en: 'make away with',
        description: 'Steal.'
    },
    {
        en: 'make do with',
        description: 'Accept something less satisfactory because there\'s no alternative.'
    },
    {
        en: 'make for',
        description: 'Head in a certain direction.'
    },
    {
        en: 'make for',
        description: 'Produce a result or situation.'
    },
    {
        en: 'make into',
        description: 'Change something into something else.'
    },
    {
        en: 'make it',
        description: 'Arrive or get a result.'
    },
    {
        en: 'make it up to',
        description: 'Try to compensate for doing something wrong.'
    },
    {
        en: 'make of',
        description: 'Understand or have an opinion.'
    },
    {
        en: 'make off',
        description: 'Leave somewhere in a hurry.'
    },
    {
        en: 'make off with',
        description: 'Steal.'
    },
    {
        en: 'make out',
        description: 'Make a cheque payable to somebody.'
    },
    {
        en: 'make out',
        description: 'Pretend.'
    },
    {
        en: 'make out',
        description: 'Progress.'
    },
    {
        en: 'make out',
        description: 'Kiss and pet.'
    },
    {
        en: 'make out',
        description: 'Discern a small detail.'
    },
    {
        en: 'make out',
        description: 'Be able to see or hear something.'
    },
    {
        en: 'make out',
        description: 'Understand someone\'s nature or personality.'
    },
    {
        en: 'make over',
        description: 'Change appearance.'
    },
    {
        en: 'make over',
        description: 'Give money or possessions to someone in a legal way.'
    },
    {
        en: 'make towards',
        description: 'Head in the direction.'
    },
    {
        en: 'make up',
        description: 'Stop being angry with someone.'
    },
    {
        en: 'make up',
        description: 'Put on cosmetics.'
    },
    {
        en: 'make up',
        description: 'Invent a story.'
    },
    {
        en: 'make up for',
        description: 'Compensate.'
    },
    {
        en: 'make up to',
        description: 'Increase a sum received to a higher figure.'
    },
    {
        en: 'make with',
        description: 'Give (usually used as an imperative).'
    },
    {
        en: 'man down',
        description: 'Behave without courage or conviction.'
    },
    {
        en: 'man up',
        description: 'Behave with courage or conviction.'
    },
    {
        en: 'mark down',
        description: 'Give a student a lower grade for a particular reason.'
    },
    {
        en: 'mark down',
        description: 'Reduce the price of something.'
    },
    {
        en: 'mark down as',
        description: 'Consider someone or something to be of a certain group, type, etc..'
    },
    {
        en: 'mark off',
        description: 'Tick, cross out or otherwise mark something to show that it has been dealt with.'
    },
    {
        en: 'mark out',
        description: 'Draw lines to enclose an area.'
    },
    {
        en: 'mark out for',
        description: 'Show promise for the future.'
    },
    {
        en: 'mark out from',
        description: 'Stand out because of certain qualities.'
    },
    {
        en: 'mark up',
        description: 'Increase the price of something.'
    },
    {
        en: 'marry in',
        description: 'Marry someone of the same ethnicity, religion, etc.'
    },
    {
        en: 'marry out',
        description: 'Marry someone of a different ethnicity, religion, etc.'
    },
    {
        en: 'mash up',
        description: 'Crush something until it becomes a paste.'
    },
    {
        en: 'mash up',
        description: 'Mix sources of audio, video or other computer sources..'
    },
    {
        en: 'mash up',
        description: 'Break or damage.'
    },
    {
        en: 'max out',
        description: 'Take something to the limit, reach a limit.'
    },
    {
        en: 'measure against',
        description: 'Evaluate or judge by comparison.'
    },
    {
        en: 'measure off',
        description: 'Measure something and mark the point where it ends or will be cut.'
    },
    {
        en: 'measure off',
        description: 'Mark a length on something to cut it.'
    },
    {
        en: 'measure out',
        description: 'Measure or weigh the amount needed.'
    },
    {
        en: 'measure out',
        description: 'Weigh or measure an exact amount.'
    },
    {
        en: 'measure up',
        description: 'Find the size of something.'
    },
    {
        en: 'measure up',
        description: 'Be good enough, meet the required standard.'
    },
    {
        en: 'measure up',
        description: 'Be good enough.'
    },
    {
        en: 'measure up',
        description: 'Find out the size of something.'
    },
    {
        en: 'measure up to',
        description: 'Be good enough or worthy of something.'
    },
    {
        en: 'meet with',
        description: 'Have something happen to you.'
    },
    {
        en: 'melt down',
        description: 'Heat something solid, especially metal, until it becomes liquid.'
    },
    {
        en: 'mess about',
        description: 'Not be serious, not use something properly.'
    },
    {
        en: 'mess about',
        description: 'Treat someone badly.'
    },
    {
        en: 'mess about',
        description: 'Have a s*x*al relationship outside marriage or a permanent relationship.'
    },
    {
        en: 'mess about with',
        description: 'Have a s*x*al relationship outside marriage or a permanent relationship.'
    },
    {
        en: 'mess about with',
        description: 'Try to improve something, usually making things worse.'
    },
    {
        en: 'mess around',
        description: 'Not be serious, play with something.'
    },
    {
        en: 'mess around',
        description: 'Treat someone badly.'
    },
    {
        en: 'mess around',
        description: 'Have a s*x*al relationship outside marriage or a permanent relationship.'
    },
    {
        en: 'mess around with',
        description: 'Have a s*x*al relationship outside marriage or a permanent relationship.'
    },
    {
        en: 'mess around with',
        description: 'Try to improve something, usually making things worse.'
    },
    {
        en: 'mess over',
        description: 'Treat someone badly.'
    },
    {
        en: 'mess up',
        description: 'Spoil or ruin.'
    },
    {
        en: 'mess up',
        description: 'Make something untidy or dirty.'
    },
    {
        en: 'mess up',
        description: 'Cause mental, physical or emotional problems.'
    },
    {
        en: 'mess with',
        description: 'Become involved in something damaging or dangerous.'
    },
    {
        en: 'mess with',
        description: 'Annoy, bother.'
    },
    {
        en: 'mess with',
        description: 'Associate (negative).'
    },
    {
        en: 'mess with',
        description: 'Try to repair or improve, usually unsuccessfully.'
    },
    {
        en: 'mete out',
        description: 'Give people harsh punishments or treatment.'
    },
    {
        en: 'mill around',
        description: 'Walk around without going anywhere.'
    },
    {
        en: 'miss out',
        description: 'Not do something enjoyable or rewarding.'
    },
    {
        en: 'miss out',
        description: 'Not include.'
    },
    {
        en: 'miss out on',
        description: 'Lose a chance, fail to achieve.'
    },
    {
        en: 'mix up',
        description: 'Confuse.'
    },
    {
        en: 'mix up',
        description: 'Make something lively.'
    },
    {
        en: 'mock up',
        description: 'Make a model of something to show or test it.'
    },
    {
        en: 'monkey around',
        description: 'Not be serious.'
    },
    {
        en: 'mooch about',
        description: 'Spend time doing little or nothing.'
    },
    {
        en: 'mooch around',
        description: 'Spend time doing little or nothing.'
    },
    {
        en: 'mop up',
        description: 'Resolve a problem.'
    },
    {
        en: 'mop up',
        description: 'Kill or capture the last few enemy soldiers after a victory..'
    },
    {
        en: 'mop up',
        description: 'Eat a sauce with bread to finish it.'
    },
    {
        en: 'mop up',
        description: 'Remove a liquid that has been spilt.'
    },
    {
        en: 'mope about',
        description: 'Move around being miserable.'
    },
    {
        en: 'mope around',
        description: 'Move around being miserable.'
    },
    {
        en: 'mount up',
        description: 'Increase over time.'
    },
    {
        en: 'mouth off',
        description: 'Speak angrily about something.'
    },
    {
        en: 'move ahead',
        description: 'Make progress, often after a pause or delay.'
    },
    {
        en: 'move along',
        description: 'Tell someone to move from a place.'
    },
    {
        en: 'move along',
        description: 'Develop or progress in a reasonable or satisfactory manner.'
    },
    {
        en: 'move away',
        description: 'Leave the area where you have been living.'
    },
    {
        en: 'move away from',
        description: 'Stop doing or using something to change to something different.'
    },
    {
        en: 'move down',
        description: 'Move a student to a lower level.'
    },
    {
        en: 'move in',
        description: 'Start living in a place.'
    },
    {
        en: 'move in on',
        description: 'Approach, often stealthily.'
    },
    {
        en: 'move into',
        description: 'Start living  in a place.'
    },
    {
        en: 'move on',
        description: 'Change the subject or your job.'
    },
    {
        en: 'move on',
        description: 'Make people move from a place.'
    },
    {
        en: 'move out',
        description: 'Leave a place you live or work in.'
    },
    {
        en: 'move out',
        description: 'Remove.'
    },
    {
        en: 'move out',
        description: 'Change lane or position to pass a vehicle.'
    },
    {
        en: 'move towards',
        description: 'Make preparations for something.'
    },
    {
        en: 'move up',
        description: 'Move to make space.'
    },
    {
        en: 'move up',
        description: 'Move to a higher level.'
    },
    {
        en: 'muddle along',
        description: 'Continue without a clear aim or plan.'
    },
    {
        en: 'muddle through',
        description: 'Do or achieve something without knowing what is required or having a plan.'
    },
    {
        en: 'muddle up',
        description: 'Take things that are ordered or sequenced and mess them up.'
    },
    {
        en: 'muddle up',
        description: 'Mistake a person or thing for someone or something else because they look similar.'
    },
    {
        en: 'mug up',
        description: 'Study quickly, revise.'
    },
    {
        en: 'mug up on',
        description: 'Study something quickly, revise.'
    },
    {
        en: 'mull over',
        description: 'Think about an issue or problem.'
    },
    {
        en: 'muscle in',
        description: 'Become involved in something when your involvement is not wanted.'
    },
    {
        en: 'muscle in on',
        description: 'Become involved in something despite opposition to your involvement.'
    },
    {
        en: 'muscle into',
        description: 'Become involved even though there is opposition to your involvement.'
    },
    {
        en: 'muscle out',
        description: 'Use power, contacts, etc, to force someone out.'
    },
    {
        en: 'naff off',
        description: 'Get lost, go away (used as imperative).'
    },
    {
        en: 'nag at',
        description: 'Repeatedly criticise someone verbally.'
    },
    {
        en: 'nail down',
        description: 'Succeed in getting, achieve.'
    },
    {
        en: 'nail down',
        description: 'Understand fully.'
    },
    {
        en: 'nail down',
        description: 'Get full information from someone.'
    },
    {
        en: 'nail down',
        description: 'Succeed or achieve something.'
    },
    {
        en: 'name after',
        description: 'Give someone a name to remember another person.'
    },
    {
        en: 'narrow down',
        description: 'Remove less important options to make it easier to choose.'
    },
    {
        en: 'nerd out',
        description: 'Play safe and avoid taking a risk.'
    },
    {
        en: 'nerd out',
        description: 'Discuss something in great detail.'
    },
    {
        en: 'nip off',
        description: 'Go somewhere quickly.'
    },
    {
        en: 'nip out',
        description: 'Go somewhere quickly.'
    },
    {
        en: 'nod off',
        description: 'Fall asleep.'
    },
    {
        en: 'nod through',
        description: 'Pass a law, regulation, etc, without considering or debating it seriously.'
    },
    {
        en: 'nose about',
        description: 'Look for something hidden or secret.'
    },
    {
        en: 'nose around',
        description: 'Look around for evidence.'
    },
    {
        en: 'nose out',
        description: 'Find out, discover- usually information, secrets, etc.'
    },
    {
        en: 'nose out',
        description: 'Narrowly beat someone.'
    },
    {
        en: 'note down',
        description: 'Write something short like a phone number for future reference..'
    },
    {
        en: 'nut out',
        description: 'Find an answer to a problem.'
    },
    {
        en: 'occur to',
        description: 'Enter one\'s mind.'
    },
    {
        en: 'open up',
        description: 'Start to talk freely about something.'
    },
    {
        en: 'open up',
        description: 'Open a shop or business for the day.'
    },
    {
        en: 'open up',
        description: 'Allow goods into a market.'
    },
    {
        en: 'operate on',
        description: 'Perform surgery.'
    },
    {
        en: 'opt for',
        description: 'Choose.'
    },
    {
        en: 'opt in',
        description: 'Choose to be part or a member of something.'
    },
    {
        en: 'opt into',
        description: 'Choose to be a member or part of something.'
    },
    {
        en: 'opt out',
        description: 'Choose not to be part of something.'
    },
    {
        en: 'owe to',
        description: 'Be the reason for something.'
    },
    {
        en: 'own up',
        description: 'Confess.'
    },
    {
        en: 'pack away',
        description: 'Put something where it belongs.'
    },
    {
        en: 'pack in',
        description: 'Stop doing something.'
    },
    {
        en: 'pack in',
        description: 'End a relationship.'
    },
    {
        en: 'pack in',
        description: 'Fill a venue.'
    },
    {
        en: 'pack in',
        description: 'Break down, stop working.'
    },
    {
        en: 'pack it in',
        description: 'Stop doing something (used as an imperative).'
    },
    {
        en: 'pack off',
        description: 'Send someone away.'
    },
    {
        en: 'pack out',
        description: 'Fill a venue.'
    },
    {
        en: 'pack up',
        description: 'Stop doing something.'
    },
    {
        en: 'pack up',
        description: 'Finish work.'
    },
    {
        en: 'pack up',
        description: 'Break down, stop working.'
    },
    {
        en: 'pack up',
        description: 'Collect things and put them where you keep them.'
    },
    {
        en: 'pad down',
        description: 'Sleep somewhere for the night.'
    },
    {
        en: 'pad out',
        description: 'Make a text longer by including extra content, often content that isn\'t particularly relevant.'
    },
    {
        en: 'pair off',
        description: 'Begin a romantic relationship.'
    },
    {
        en: 'pair off',
        description: 'Introduce people, hoping they will start a relationship.'
    },
    {
        en: 'pair off',
        description: 'Form pairs.'
    },
    {
        en: 'pair off with',
        description: 'Form a pair with someone.'
    },
    {
        en: 'pair up',
        description: 'Form a pair.'
    },
    {
        en: 'pal about',
        description: 'Be friendly and spend time with someone.'
    },
    {
        en: 'pal around',
        description: 'Be friendly and spend time with someone.'
    },
    {
        en: 'pal up',
        description: 'Become friends.'
    },
    {
        en: 'palm off',
        description: 'Get someone to accept something that isn\'t true.'
    },
    {
        en: 'palm off',
        description: 'Pretend something is better than it is in order to sell it.'
    },
    {
        en: 'pan out',
        description: 'The way a situation develops.'
    },
    {
        en: 'paper over',
        description: 'Try to conceal a problem without really fixing it.'
    },
    {
        en: 'pare back',
        description: 'If you pare something back, you reduce the size or numbers..'
    },
    {
        en: 'pare down',
        description: 'Reduce, decrease.'
    },
    {
        en: 'part with',
        description: 'Give something away, especially when you don\'t want to.'
    },
    {
        en: 'pass around',
        description: 'Give out to everybody there.'
    },
    {
        en: 'pass as',
        description: 'Be believed to be something.'
    },
    {
        en: 'pass away',
        description: 'Die.'
    },
    {
        en: 'pass back',
        description: 'Return.'
    },
    {
        en: 'pass by',
        description: 'Go past without stopping.'
    },
    {
        en: 'pass by',
        description: 'Visit briefly.'
    },
    {
        en: 'pass by',
        description: 'Miss an opportunity.'
    },
    {
        en: 'pass down',
        description: 'Transmit information or give property to younger generations.'
    },
    {
        en: 'pass for',
        description: 'Be accepted as something, usually when not.'
    },
    {
        en: 'pass off',
        description: 'Convince something that something is real.'
    },
    {
        en: 'pass off',
        description: 'Happen in a certain way.'
    },
    {
        en: 'pass on',
        description: 'Give a message to someone.'
    },
    {
        en: 'pass on',
        description: 'Decline an invitation or opportunity.'
    },
    {
        en: 'pass on',
        description: 'Die.'
    },
    {
        en: 'pass on to',
        description: 'Change topic or subject.'
    },
    {
        en: 'pass out',
        description: 'Faint, lose consciousness.'
    },
    {
        en: 'pass out',
        description: 'Distribute.'
    },
    {
        en: 'pass over',
        description: 'Ignore someone and give a job, reward, etc, to someone more junior.'
    },
    {
        en: 'pass over',
        description: 'Ignore, refuse to discuss.'
    },
    {
        en: 'pass round',
        description: 'Distribute, give to people present.'
    },
    {
        en: 'pass through',
        description: 'Visit a place without stopping or only stopping briefly.'
    },
    {
        en: 'pass to',
        description: 'Give ownership or responsibility to someone.'
    },
    {
        en: 'pass to',
        description: 'Become owner of or responsible for something.'
    },
    {
        en: 'pass up',
        description: 'Decline a chance.'
    },
    {
        en: 'pat down',
        description: 'Search or frisk someone.'
    },
    {
        en: 'patch together',
        description: 'Create or assemble something quickly without much planning.'
    },
    {
        en: 'patch up',
        description: 'Fix or make things better.'
    },
    {
        en: 'patch up',
        description: 'Give an injured person basic medical treatment.'
    },
    {
        en: 'pay back',
        description: 'Repay money borrowed.'
    },
    {
        en: 'pay back',
        description: 'Take revenge on.'
    },
    {
        en: 'pay down',
        description: 'Pay a debt over time.'
    },
    {
        en: 'pay for',
        description: 'Purchase.'
    },
    {
        en: 'pay into',
        description: 'Deposit money.'
    },
    {
        en: 'pay off',
        description: 'Completely repay a debt.'
    },
    {
        en: 'pay off',
        description: 'Produce a profitable or successful result.'
    },
    {
        en: 'peck at',
        description: 'Eat very small amounts.'
    },
    {
        en: 'peel away',
        description: 'Leave a group by moving in a different direction.'
    },
    {
        en: 'peel away from',
        description: 'Leave a group by moving in a different direction.'
    },
    {
        en: 'peel off',
        description: 'Leave a group by moving in a different direction.'
    },
    {
        en: 'peel off from',
        description: 'Leave a group by moving in a different direction.'
    },
    {
        en: 'peel out',
        description: 'Accelerate rapidly from stationary.'
    },
    {
        en: 'peg away',
        description: 'Keep working at something.'
    },
    {
        en: 'peg down',
        description: 'Fasten something to the ground.'
    },
    {
        en: 'peg it',
        description: 'Die.'
    },
    {
        en: 'peg out',
        description: 'Put washing outside to dry.'
    },
    {
        en: 'peg out',
        description: 'Die.'
    },
    {
        en: 'pencil in',
        description: 'Make a provisional appointment.'
    },
    {
        en: 'pep up',
        description: 'Make something more interesting.'
    },
    {
        en: 'pep up',
        description: 'Make someone more enthusiastic, energetic or interested.'
    },
    {
        en: 'perk up',
        description: 'Feel better or happier, make someone feel better or happier.'
    },
    {
        en: 'peter out',
        description: 'Lose impetus and stop.'
    },
    {
        en: 'phase in',
        description: 'Introduce gradually.'
    },
    {
        en: 'phase out',
        description: 'Remove gradually.'
    },
    {
        en: 'pick at',
        description: 'Eat unwillingly.'
    },
    {
        en: 'pick at',
        description: 'Criticise.'
    },
    {
        en: 'pick off',
        description: 'Target individuals to change a group.'
    },
    {
        en: 'pick on',
        description: 'Bother, annoy, criticize or make fun of someone.'
    },
    {
        en: 'pick out',
        description: 'Choose.'
    },
    {
        en: 'pick out',
        description: 'Identify from a picture.'
    },
    {
        en: 'pick through',
        description: 'Search something that is disordered for something.'
    },
    {
        en: 'pick up',
        description: 'Improve.'
    },
    {
        en: 'pick up',
        description: 'Learn quickly.'
    },
    {
        en: 'pick up',
        description: 'Collect.'
    },
    {
        en: 'pick up',
        description: 'Receive (a broadcast).'
    },
    {
        en: 'pick up',
        description: 'Collect (a person). This differs from the \'collect a thing\' meaning - as that means \'collect and bring back\' whereas this means either (1) \'collect and drop off on your way\' or (2)  \'collect and bring to the same destination\'...'
    },
    {
        en: 'pick up after',
        description: 'Tidy a mess someone else has made.'
    },
    {
        en: 'pick up on',
        description: 'Correct someone when they say something wrong.'
    },
    {
        en: 'pick up on',
        description: 'Notice something that most people don\'t.'
    },
    {
        en: 'pick up on',
        description: 'React to something.'
    },
    {
        en: 'pick up on',
        description: 'Comment on something said earlier in a conversation.'
    },
    {
        en: 'pick yourself up',
        description: 'Recover from a fall or problem.'
    },
    {
        en: 'pig off',
        description: 'Used to tell someone to get lost or leave you alone.'
    },
    {
        en: 'pig out',
        description: 'Eat a lot.'
    },
    {
        en: 'pile in',
        description: 'Enter a place quickly, in a disorganised way.'
    },
    {
        en: 'pile into',
        description: 'Enter a place quickly, in a disorganised way.'
    },
    {
        en: 'pile on',
        description: 'Add or give more or something.'
    },
    {
        en: 'pile on',
        description: 'Exaggerate or talk in a way to affect someone\'s  feelings.'
    },
    {
        en: 'pile out',
        description: 'Leave a place quickly, in a disorganised way.'
    },
    {
        en: 'pile up',
        description: 'Accumulate.'
    },
    {
        en: 'pile up',
        description: 'Accumulate in a pile or heap.'
    },
    {
        en: 'pin down',
        description: 'Get a fixed idea, opinion, etc, from someone..'
    },
    {
        en: 'pin down',
        description: 'Discover exact details about something.'
    },
    {
        en: 'pin on',
        description: 'Attach the blame to someone.'
    },
    {
        en: 'pin up',
        description: 'Fix something to a wall, or other vertical surface, with a pin.'
    },
    {
        en: 'pine away',
        description: 'Suffer physically because of grief, stress, worry, etc.'
    },
    {
        en: 'pipe down',
        description: 'Be quiet (often as an imperative).'
    },
    {
        en: 'pipe up',
        description: 'To speak, raise your voice.'
    },
    {
        en: 'pit against',
        description: 'Compete or force to compete.'
    },
    {
        en: 'pit out',
        description: 'Go into the pits (car racing).'
    },
    {
        en: 'pitch for',
        description: 'Try to persuade someone to give your work, business, a job, etc.'
    },
    {
        en: 'pitch in',
        description: 'Work together to help achieve an objective.'
    },
    {
        en: 'pitch into',
        description: 'Criticise severely or attack someone.'
    },
    {
        en: 'plant out',
        description: 'Put a young plant that has been grown in a pot or greenhouse into the ground.'
    },
    {
        en: 'plate up',
        description: 'Put food onto a plate to serve.'
    },
    {
        en: 'play along',
        description: 'Pretend to agree or accept something in order to keep someone happy or to get more information.'
    },
    {
        en: 'play around',
        description: 'Be silly.'
    },
    {
        en: 'play around',
        description: 'Be s*xu*lly promiscuous or unfaithful.'
    },
    {
        en: 'play at',
        description: 'Pretend to be something.'
    },
    {
        en: 'play away',
        description: 'Be s*xu*lly unfaithful when away from home.'
    },
    {
        en: 'play back',
        description: 'Listen to or watch something you\'ve recorded.'
    },
    {
        en: 'play down',
        description: 'Try to make something seem less important.'
    },
    {
        en: 'play off',
        description: 'Play a game to decide who the winner is.'
    },
    {
        en: 'play off',
        description: 'Make people compete against each other so that you benefit.'
    },
    {
        en: 'play on',
        description: 'Continue playing a sport though there might be a reason to stop.'
    },
    {
        en: 'play on',
        description: 'Continue playing music.'
    },
    {
        en: 'play on',
        description: 'Exploit a weakness.'
    },
    {
        en: 'play on',
        description: 'Pun.'
    },
    {
        en: 'play out',
        description: 'Progress, often till it finishes.'
    },
    {
        en: 'play out',
        description: 'Pretend that something is real and reduce its effect.'
    },
    {
        en: 'play out',
        description: 'Play something to the end.'
    },
    {
        en: 'play out',
        description: 'Unwind (e.g., fishing line).'
    },
    {
        en: 'play up',
        description: 'Behave badly.'
    },
    {
        en: 'play up to',
        description: 'Flatter someone.'
    },
    {
        en: 'play up to',
        description: 'Behave in a way expected.'
    },
    {
        en: 'play upon',
        description: 'Exploit a weakness.'
    },
    {
        en: 'play with',
        description: 'Touch and move something to occupy your hands.'
    },
    {
        en: 'play with',
        description: 'Not eat much of a meal.'
    },
    {
        en: 'play with',
        description: 'Consider something, but not seriously.'
    },
    {
        en: 'plead out',
        description: 'Plead guilty to get a reduced sentence or fine.'
    },
    {
        en: 'plough back',
        description: 'Re-invest money you have made into a business.'
    },
    {
        en: 'plough into',
        description: 'Collide into at speed.'
    },
    {
        en: 'plough on',
        description: 'Continue doing something you don\'t want to.'
    },
    {
        en: 'plough through',
        description: 'Eat a big meal.'
    },
    {
        en: 'plough through',
        description: 'Read something that is difficult or takes a lot of time.'
    },
    {
        en: 'plough through',
        description: 'Move through somewhere where there is little space or there are obstacles.'
    },
    {
        en: 'plough up',
        description: 'Break the surface of soil.'
    },
    {
        en: 'plow back',
        description: 'Re-invest money you have made into a business.'
    },
    {
        en: 'plow into',
        description: 'Collide into at speed.'
    },
    {
        en: 'plow on',
        description: 'Continue doing something you don\'t want to.'
    },
    {
        en: 'plow through',
        description: 'Eat a big meal.'
    },
    {
        en: 'plow through',
        description: 'Read something that is difficult or takes a lot of time.'
    },
    {
        en: 'plow through',
        description: 'Move through somewhere where there is little space or there are obstacles.'
    },
    {
        en: 'plow up',
        description: 'Break the surface of soil.'
    },
    {
        en: 'pluck at',
        description: 'Pull or fiddle with something nervously.'
    },
    {
        en: 'pluck up',
        description: 'Muster, acquire, gather.'
    },
    {
        en: 'plug in',
        description: 'Connect machines to the electricity supply.'
    },
    {
        en: 'plump down',
        description: 'Put  something in a place without taking care.'
    },
    {
        en: 'plump for',
        description: 'Choose.'
    },
    {
        en: 'plump up',
        description: 'Make something like a cushion bigger and softer by shaking it.'
    },
    {
        en: 'plump yourself down',
        description: 'Sit down heavily.'
    },
    {
        en: 'point out',
        description: 'Make someone aware of something.'
    },
    {
        en: 'poke about',
        description: 'Move things around or search in a casual way to try to find something.'
    },
    {
        en: 'poke around',
        description: 'Move things around or search in a casual way to try to find something.'
    },
    {
        en: 'polish off',
        description: 'Finish, consume.'
    },
    {
        en: 'polish up',
        description: 'Improve something quickly.'
    },
    {
        en: 'pony up',
        description: 'Pay for something.'
    },
    {
        en: 'poop out',
        description: 'Get too tired to do something.'
    },
    {
        en: 'poop out on',
        description: 'Fail to keep an appointment.'
    },
    {
        en: 'pootle along',
        description: 'Travel in a leisurely  way.'
    },
    {
        en: 'pop in',
        description: 'Visit for a short time.'
    },
    {
        en: 'pop off',
        description: 'Talk loudly, complain.'
    },
    {
        en: 'pop off',
        description: 'Go out for a short time.'
    },
    {
        en: 'pop out',
        description: 'Go out for a short time.'
    },
    {
        en: 'pop up',
        description: 'Appear, like windows and boxes opening on a computer screen..'
    },
    {
        en: 'pop up',
        description: 'Appear unexpectedly.'
    },
    {
        en: 'pore over',
        description: 'Read, look at or study carefully.'
    },
    {
        en: 'potter about',
        description: 'Spend time doing little things for pleasure.'
    },
    {
        en: 'potter around',
        description: 'Spend some time doing little things for pleasure.'
    },
    {
        en: 'pour down',
        description: 'Rain hard.'
    },
    {
        en: 'pour forth',
        description: 'Emerge from a place in large numbers.'
    },
    {
        en: 'power down',
        description: 'Cut the electricity supply to a computer or electronic device.'
    },
    {
        en: 'power off',
        description: 'Cut the electricity to a computer or device to turn it off.'
    },
    {
        en: 'power up',
        description: 'Turn a computer or electronic device on so that it is ready to use.'
    },
    {
        en: 'prattle on',
        description: 'Talk too much.'
    },
    {
        en: 'press ahead',
        description: 'Continue with something.'
    },
    {
        en: 'press for',
        description: 'Apply pressure to get permission or to obtain something.'
    },
    {
        en: 'press forward with',
        description: 'Continue or go ahead with a project, process, plan, etc.'
    },
    {
        en: 'press into',
        description: 'Bring or force into use.'
    },
    {
        en: 'press on',
        description: 'Continue with something.'
    },
    {
        en: 'press upon',
        description: 'Pressure someone to accept something offered.'
    },
    {
        en: 'prey on',
        description: 'Catch and kill an animal for food.'
    },
    {
        en: 'prey on',
        description: 'Exploit or harm.'
    },
    {
        en: 'prey upon',
        description: 'Catch and kill an animal for food.'
    },
    {
        en: 'prey upon',
        description: 'Exploit or harm.'
    },
    {
        en: 'price in',
        description: 'Include the affects of possible future events when assessing the value of something.'
    },
    {
        en: 'price up',
        description: 'Charge more for something.'
    },
    {
        en: 'print out',
        description: 'Make a hard copy of a computer document.'
    },
    {
        en: 'prop up',
        description: 'Support something, both physically and financially, politically, etc..'
    },
    {
        en: 'psych out',
        description: 'Work out or anticipate someone\'s intentions.'
    },
    {
        en: 'psych out',
        description: 'Make someone less confident.'
    },
    {
        en: 'psych up',
        description: 'Prepare someone mentally.'
    },
    {
        en: 'pucker up',
        description: 'Move your lips into position to receive a kiss.'
    },
    {
        en: 'pull ahead',
        description: 'Overtake, move in front.'
    },
    {
        en: 'pull apart',
        description: 'Destroy an argument, theory, etc.'
    },
    {
        en: 'pull apart',
        description: 'Stop people or animals fighting.'
    },
    {
        en: 'pull apart',
        description: 'Make someone unhappy or upset.'
    },
    {
        en: 'pull away',
        description: 'When a vehicle moves from a place.'
    },
    {
        en: 'pull back',
        description: 'Score a goal or point when losing.'
    },
    {
        en: 'pull back',
        description: 'Move away from a place, especially when talking about soldiers.'
    },
    {
        en: 'pull back',
        description: 'Move away from someone.'
    },
    {
        en: 'pull back',
        description: 'Decide not to do something or not to be involved with it any longer.'
    },
    {
        en: 'pull down',
        description: 'Demolish.'
    },
    {
        en: 'pull down',
        description: 'Make someone depressed.'
    },
    {
        en: 'pull down',
        description: 'Earn.'
    },
    {
        en: 'pull for',
        description: 'Support.'
    },
    {
        en: 'pull in',
        description: 'When a train arrives at a station.'
    },
    {
        en: 'pull in',
        description: 'Attract.'
    },
    {
        en: 'pull in',
        description: 'Stop a car by the side of the road.'
    },
    {
        en: 'pull in',
        description: 'Areest or take someone to a police station for questioning.'
    },
    {
        en: 'pull off',
        description: 'Manage to do something difficult or tricky.'
    },
    {
        en: 'pull off',
        description: 'Start moving (vehicles).'
    },
    {
        en: 'pull on',
        description: 'Put clothes on.'
    },
    {
        en: 'pull out',
        description: 'Start moving (train).'
    },
    {
        en: 'pull out',
        description: 'Move into traffic.'
    },
    {
        en: 'pull out',
        description: 'Withdraw.'
    },
    {
        en: 'pull out',
        description: 'Remove soldiers from an area.'
    },
    {
        en: 'pull over',
        description: 'Stop by the side of the road.'
    },
    {
        en: 'pull over',
        description: 'Make a vehicle stop.'
    },
    {
        en: 'pull through',
        description: 'Recover from and illness or problem.'
    },
    {
        en: 'pull to',
        description: 'Close a door or window that has been left open.'
    },
    {
        en: 'pull together',
        description: 'Work together as a team.'
    },
    {
        en: 'pull up',
        description: 'Slow and stop a car.'
    },
    {
        en: 'pull up',
        description: 'Inform someone that they are wrong.'
    },
    {
        en: 'pull yourself together',
        description: 'Become calm or regain control of your emotions.'
    },
    {
        en: 'push in',
        description: 'Get in a queue without waiting.'
    },
    {
        en: 'put across',
        description: 'Communicate, convey a message.'
    },
    {
        en: 'put away',
        description: 'Put something back in the correct place.'
    },
    {
        en: 'put away',
        description: 'Put someone in prison.'
    },
    {
        en: 'put back',
        description: 'Rearrange something for a later time.'
    },
    {
        en: 'put by',
        description: 'Save for the future.'
    },
    {
        en: 'put down',
        description: 'Kill an animal because it\'s old, ill, etc..'
    },
    {
        en: 'put down',
        description: 'Stop holding (but withdraw support gently).'
    },
    {
        en: 'put down for',
        description: 'Commit to make a payment.'
    },
    {
        en: 'put down to',
        description: 'Give as an explanation.'
    },
    {
        en: 'put in',
        description: 'Install.'
    },
    {
        en: 'put in for',
        description: 'Make a request.'
    },
    {
        en: 'put off',
        description: 'Postpone.'
    },
    {
        en: 'put off',
        description: 'Stop liking something or somebody.'
    },
    {
        en: 'put on',
        description: 'Get fat.'
    },
    {
        en: 'put on',
        description: 'Deceive, lie.'
    },
    {
        en: 'put on',
        description: 'Start wearing.'
    },
    {
        en: 'put out',
        description: 'Broadcast.'
    },
    {
        en: 'put out',
        description: 'Disturb or trouble someone.'
    },
    {
        en: 'put out',
        description: 'Extinguish a cigarette, fire, etc..'
    },
    {
        en: 'put over',
        description: 'Successfully execute (a scam, trick, etc.).'
    },
    {
        en: 'put through',
        description: 'Connect someone by phone.'
    },
    {
        en: 'put towards',
        description: 'Make a financial contribution.'
    },
    {
        en: 'put up',
        description: 'Allow someone to stay at your house for a night or a few days..'
    },
    {
        en: 'put up',
        description: 'Increase prices, taxes, duties, etc..'
    },
    {
        en: 'put up',
        description: 'Show skill or determination in a contest, competition, fight, etc.'
    },
    {
        en: 'put up to',
        description: 'Encourage someone to do something.'
    },
    {
        en: 'put up with',
        description: 'Tolerate.'
    },
    {
        en: 'quarrel out',
        description: 'Argue with someone about a specific subject.'
    },
    {
        en: 'quarrel with',
        description: 'Dispute or disagree with something.'
    },
    {
        en: 'queer up',
        description: 'Mess up, ruin.'
    },
    {
        en: 'quieten down',
        description: 'Fall silent.'
    },
    {
        en: 'quit on',
        description: 'Stop working, associating or being friends with someone, especially when they need support.'
    },
    {
        en: 'quit on',
        description: 'Stop working or functioning.'
    },
    {
        en: 'race off',
        description: 'Hurry away, leave somewhere quickly.'
    },
    {
        en: 'rack off',
        description: 'Used to tell someone to go away because they\'re annoying you.'
    },
    {
        en: 'rack out',
        description: 'Sleep, take a nap.'
    },
    {
        en: 'rack up',
        description: 'Acquire a lot of something.'
    },
    {
        en: 'rack up',
        description: 'Damage.'
    },
    {
        en: 'rain down on',
        description: 'Fall in large numbers.'
    },
    {
        en: 'rain off',
        description: 'Be postponed or stopped by rain (usually passive).'
    },
    {
        en: 'rain out',
        description: 'Be postponed or stopped by rain (usually passive).'
    },
    {
        en: 'rake in',
        description: 'Earn, make  money easily.'
    },
    {
        en: 'rake it in',
        description: 'Make a lot of money.'
    },
    {
        en: 'rake off',
        description: 'Cheat someone  by  charging  them too much.'
    },
    {
        en: 'rake over',
        description: 'Talk, think, etc,  about something negative in the  past.'
    },
    {
        en: 'rake up',
        description: 'Bring something back to people\'s attention.'
    },
    {
        en: 'ramble on',
        description: 'Talk at length without getting to the point.'
    },
    {
        en: 'ramp up',
        description: 'Increase price, speed or power of something.'
    },
    {
        en: 'rap out',
        description: 'Say something firmly and loudly.'
    },
    {
        en: 'rat on',
        description: 'Inform authorities about someone\'s wrongdoings.'
    },
    {
        en: 'rat on',
        description: 'Fail to keep a promise.'
    },
    {
        en: 'rat out',
        description: 'Inform the authorities about someone.'
    },
    {
        en: 'rat through',
        description: 'Look for something hurriedly.'
    },
    {
        en: 'ratchet up',
        description: 'Increase.'
    },
    {
        en: 'rattle off',
        description: 'Quote figures rapidly.'
    },
    {
        en: 'reach out',
        description: 'Stretch your arm to get something.'
    },
    {
        en: 'reach out for',
        description: 'Try to achieve something difficult.'
    },
    {
        en: 'reach out to',
        description: 'Ask for help.'
    },
    {
        en: 'reach out to',
        description: 'Offer help.'
    },
    {
        en: 'reach out to',
        description: 'Try to communicate and establish good relations with people.'
    },
    {
        en: 'read off',
        description: 'Read a list aloud for someone to write down.'
    },
    {
        en: 'read out',
        description: 'Read aloud rather than silently.'
    },
    {
        en: 'read up on',
        description: 'Research.'
    },
    {
        en: 'reason out',
        description: 'Come to a conclusion or solution after some thought.'
    },
    {
        en: 'reckon on',
        description: 'The minimum expected.'
    },
    {
        en: 'reel in',
        description: 'Catch a fish on a line and pull the line to land.'
    },
    {
        en: 'reel in',
        description: 'Attract people, especially customers, to get them to do what you want them to.'
    },
    {
        en: 'reel off',
        description: 'Quote statistics or facts rapidly.'
    },
    {
        en: 'reel off',
        description: 'Score a lot of points or win a lot of games one after the other.'
    },
    {
        en: 'reel out',
        description: 'Unwind.'
    },
    {
        en: 'rein in',
        description: 'Control someone or something to stop them causing more trouble.'
    },
    {
        en: 'rent out',
        description: 'Let, grant a service or allow usage for a fee.'
    },
    {
        en: 'ride off',
        description: 'Go away on a bike, horse, etc.'
    },
    {
        en: 'ride on',
        description: 'Depend on.'
    },
    {
        en: 'ride out',
        description: 'Survive a difficult time.'
    },
    {
        en: 'ride up',
        description: 'Move higher on the body (of clothes).'
    },
    {
        en: 'ring back',
        description: 'Return a phonecall.'
    },
    {
        en: 'ring in',
        description: 'Telephone to inform or confirm something.'
    },
    {
        en: 'ring off',
        description: 'Finish a phone conversation.'
    },
    {
        en: 'ring out',
        description: 'Make a sudden loud sound.'
    },
    {
        en: 'ring round',
        description: 'Telephone a number of people, usually  to try  to get some information.'
    },
    {
        en: 'ring up',
        description: 'Telephone.'
    },
    {
        en: 'ring up',
        description: 'Achieve an amount or number.'
    },
    {
        en: 'ring up',
        description: 'Enter figures into  a till or cash register.'
    },
    {
        en: 'ring with',
        description: 'When a place is full of a loud sound.'
    },
    {
        en: 'rip off',
        description: 'Charge excessively or obtain money unfairly.'
    },
    {
        en: 'roll back',
        description: 'Retreat.'
    },
    {
        en: 'roll back',
        description: 'Reduce or remove.'
    },
    {
        en: 'roll by',
        description: 'Pass (time).'
    },
    {
        en: 'roll in',
        description: 'Arrive somewhere, especially if late.'
    },
    {
        en: 'roll in',
        description: 'Arrive in large numbers, for military vehicles.'
    },
    {
        en: 'roll on',
        description: 'When something continues to happen.'
    },
    {
        en: 'roll on!',
        description: 'Said when you can\'t wait for something nice in the future.'
    },
    {
        en: 'roll out',
        description: 'Launch or introduce a new product, initiative, etc..'
    },
    {
        en: 'roll up',
        description: 'To appear in large numbers for an event.'
    },
    {
        en: 'roll up!',
        description: 'An imperative used to attract people to a public event.'
    },
    {
        en: 'romp in',
        description: 'Win easily.'
    },
    {
        en: 'romp through',
        description: 'Do something easily or quickly.'
    },
    {
        en: 'room in',
        description: 'To keep a mother and baby together after the birth.'
    },
    {
        en: 'root about',
        description: 'Look in a place to try to find something.'
    },
    {
        en: 'root around',
        description: 'Look in a place to try to find something.'
    },
    {
        en: 'root for',
        description: 'Support.'
    },
    {
        en: 'root out',
        description: 'Look for and find.'
    },
    {
        en: 'root out',
        description: 'Find the source of a problem and remove it.'
    },
    {
        en: 'root up',
        description: 'Dig a plant out of the ground.'
    },
    {
        en: 'rope in',
        description: 'Get somebody to help.'
    },
    {
        en: 'rope into',
        description: 'Get someone to help or become involved, usually when they don\'t want to.'
    },
    {
        en: 'rope off',
        description: 'Extend ropes or barriers across or around an area.'
    },
    {
        en: 'rough up',
        description: 'Assault.'
    },
    {
        en: 'round off',
        description: 'Finish something in a satisfactory manner.'
    },
    {
        en: 'row back',
        description: 'Retreat from a position.'
    },
    {
        en: 'rub along',
        description: 'Have a reasonably good relationship.'
    },
    {
        en: 'rub down',
        description: 'Dry or clean something with a cloth.'
    },
    {
        en: 'rub down',
        description: 'Massage or rub someone to help them relax.'
    },
    {
        en: 'rub in',
        description: 'Apply a substance like cream or ointment and rub it until it is absorbed.'
    },
    {
        en: 'rub it in',
        description: 'Emphasise how bad a situation is to make someone feel worse.'
    },
    {
        en: 'rub off on',
        description: 'Pass a quality or characteristic to people.'
    },
    {
        en: 'rub out',
        description: 'Delete ink or pencil with an eraser.'
    },
    {
        en: 'rub out',
        description: 'Kill.'
    },
    {
        en: 'rub up against',
        description: 'Touch someone in a sensual or s*x*al way.'
    },
    {
        en: 'rub up on',
        description: 'Revise.'
    },
    {
        en: 'rule out',
        description: 'Exclude a possibility.'
    },
    {
        en: 'run across',
        description: 'Meet or find accidentally.'
    },
    {
        en: 'run after',
        description: 'Chase, pursue.'
    },
    {
        en: 'run after',
        description: 'Try to become romantically involved with someone.'
    },
    {
        en: 'run against',
        description: 'Oppose, make difficulties.'
    },
    {
        en: 'run along',
        description: 'Go away, leave (often as an imperative).'
    },
    {
        en: 'run around',
        description: 'Be very busy doing many things.'
    },
    {
        en: 'run away',
        description: 'Escape from people chasing you.'
    },
    {
        en: 'run away',
        description: 'Leave home because of problems with other family members or to elope.'
    },
    {
        en: 'run down',
        description: 'Hit a pedestrian with a vehicle.'
    },
    {
        en: 'run down',
        description: 'Lose energy or power.'
    },
    {
        en: 'run down',
        description: 'Criticise, disparage.'
    },
    {
        en: 'run down',
        description: 'Find the source or origin of something.'
    },
    {
        en: 'run for',
        description: 'Campaign for a position.'
    },
    {
        en: 'run in',
        description: 'Arrest, take to police station for questioning.'
    },
    {
        en: 'run in',
        description: 'Drive a new car carefully in order not to damage the engine.'
    },
    {
        en: 'run in',
        description: 'Pay a casual visit.'
    },
    {
        en: 'run in',
        description: 'Insert.'
    },
    {
        en: 'run into',
        description: 'Cost.'
    },
    {
        en: 'run into',
        description: 'Meet by accident.'
    },
    {
        en: 'run off',
        description: 'Make photocopies.'
    },
    {
        en: 'run on',
        description: 'Be powered by.'
    },
    {
        en: 'run out of',
        description: 'Have none left.'
    },
    {
        en: 'run over',
        description: 'Explain quickly.'
    },
    {
        en: 'run over',
        description: 'Hit with a vehicle.'
    },
    {
        en: 'run over',
        description: 'Exceed a time limit.'
    },
    {
        en: 'run through',
        description: 'Practise a dramatic work like a play quickly.'
    },
    {
        en: 'run through',
        description: 'Stab or wound deeply with a knife, sword, etc..'
    },
    {
        en: 'run to',
        description: 'Go to someone for help.'
    },
    {
        en: 'run to',
        description: 'Include in things you like.'
    },
    {
        en: 'run to',
        description: 'Have enough money to buy something, often negative.'
    },
    {
        en: 'run up',
        description: 'Move quickly to where someone is.'
    },
    {
        en: 'run up',
        description: 'Hoist, raise a flag.'
    },
    {
        en: 'run up',
        description: 'Do or make something very quickly.'
    },
    {
        en: 'run up',
        description: 'Spend a lot of money on credit.'
    },
    {
        en: 'run up against',
        description: 'Encounter problems, often unexpected.'
    },
    {
        en: 'run up on',
        description: 'Approach someone without their knowing.'
    },
    {
        en: 'run with',
        description: 'Keep company, normally bad.'
    },
    {
        en: 'rush away',
        description: 'Leave a place in a hurry.'
    },
    {
        en: 'rush into',
        description: 'Do something too quickly.'
    },
    {
        en: 'rush off',
        description: 'Depart in a hurry.'
    },
    {
        en: 'rush out',
        description: 'Release or put something on  sale quickly.'
    },
    {
        en: 'rustle up',
        description: 'Make something quickly without much preparation.'
    },
    {
        en: 'saddle up',
        description: 'Put a saddle on and prepare an animal to ride.'
    },
    {
        en: 'saddle with',
        description: 'Give someone a task or responsibility that is difficult or hard work.'
    },
    {
        en: 'sag off',
        description: 'Not go to school or work, or leave early when you shouldn\'t.'
    },
    {
        en: 'sail into',
        description: 'Criticise angrily.'
    },
    {
        en: 'sail through',
        description: 'Pass easily, succeed.'
    },
    {
        en: 'sally forth',
        description: 'Leave somewhere safe or comfortable.'
    },
    {
        en: 'sally out',
        description: 'Leave somewhere safe or comfortable.'
    },
    {
        en: 'salt away',
        description: 'Save money.'
    },
    {
        en: 'save on',
        description: 'Reduce or avoid consumption to cut costs.'
    },
    {
        en: 'save up',
        description: 'For money for a particular purpose.'
    },
    {
        en: 'save up',
        description: 'Collect or store something for future use.'
    },
    {
        en: 'saw off',
        description: 'To remove something by cutting it with a saw.'
    },
    {
        en: 'saw up',
        description: 'Cut into pieces with a saw.'
    },
    {
        en: 'scale back',
        description: 'Make something smaller than originally planned.'
    },
    {
        en: 'scale down',
        description: 'Make something smaller than originally planned.'
    },
    {
        en: 'scale up',
        description: 'Increase, make bigger.'
    },
    {
        en: 'scare away',
        description: 'Frighten someone some much that they go away.'
    },
    {
        en: 'scare off',
        description: 'Make someone so frightened that he or she away.'
    },
    {
        en: 'scout about',
        description: 'Look in different places for something.'
    },
    {
        en: 'scout around',
        description: 'Look in different places for something.'
    },
    {
        en: 'scout out',
        description: 'Search for something.'
    },
    {
        en: 'scout round',
        description: 'Look in different places for something.'
    },
    {
        en: 'scout up',
        description: 'Try to find someone for a task or requirement.'
    },
    {
        en: 'scrape along',
        description: 'Manage with little money.'
    },
    {
        en: 'scrape by',
        description: 'Just manage to pass something.'
    },
    {
        en: 'scrape in',
        description: 'Just get enough to succeed, pass or be accepted.'
    },
    {
        en: 'scrape into',
        description: 'Be accepted somewhere, but only just.'
    },
    {
        en: 'scrape through',
        description: 'Pass a test but only just.'
    },
    {
        en: 'scrape together',
        description: 'Manage to collect enough of something you need, usually money.'
    },
    {
        en: 'scrape up',
        description: 'Manage to collect enough of something you need, usually money.'
    },
    {
        en: 'screen off',
        description: 'Separate a part of a room with something like a curtain, screen, etc..'
    },
    {
        en: 'screen out',
        description: 'Exclude.'
    },
    {
        en: 'screen out',
        description: 'Block light.'
    },
    {
        en: 'screen out',
        description: 'Stop noticing something.'
    },
    {
        en: 'screw around',
        description: 'Waste time.'
    },
    {
        en: 'screw around',
        description: 'Be s*xu*lly promiscuous.'
    },
    {
        en: 'screw over',
        description: 'Treat harshly or cheat.'
    },
    {
        en: 'screw up',
        description: 'Do badly or fail.'
    },
    {
        en: 'see about',
        description: 'Arrange, consider.'
    },
    {
        en: 'see into',
        description: 'Accompany someone into an office.'
    },
    {
        en: 'see off',
        description: 'Chase somebody or something away.'
    },
    {
        en: 'see off',
        description: 'Go to the airport, station, etc., to say goodbye to someone.'
    },
    {
        en: 'see out',
        description: 'Accompany a guest to your front door when they are leaving your house.'
    },
    {
        en: 'see through',
        description: 'Continue with something to the end.'
    },
    {
        en: 'see through',
        description: 'Realise someone is lying or being deceitful.'
    },
    {
        en: 'see to',
        description: 'Deal with something.'
    },
    {
        en: 'sell off',
        description: 'Sell a business or part of it.'
    },
    {
        en: 'sell off',
        description: 'Sell something cheaply because you need the money or don\'t need it.'
    },
    {
        en: 'sell on',
        description: 'Convince someone.'
    },
    {
        en: 'sell on',
        description: 'Buy something then sell it to someone else.'
    },
    {
        en: 'sell out',
        description: 'Have no more of something left because it has been bought.'
    },
    {
        en: 'sell out',
        description: 'Lose all artistic integrity in return for commercial success.'
    },
    {
        en: 'sell up',
        description: 'Sell a house or business to move somewhere or do something different.'
    },
    {
        en: 'send back',
        description: 'Return something.'
    },
    {
        en: 'send for',
        description: 'Ask someone to come and help.'
    },
    {
        en: 'send in',
        description: 'Order people into a place to handle a problem.'
    },
    {
        en: 'send in',
        description: 'Write to get information.'
    },
    {
        en: 'send off',
        description: 'Expel a sports player from a match.'
    },
    {
        en: 'send off',
        description: 'Post a letter.'
    },
    {
        en: 'send off for',
        description: 'Order something by post.'
    },
    {
        en: 'send out',
        description: 'Send something to a lot of people.'
    },
    {
        en: 'send out for',
        description: 'Order takeaway food by phone.'
    },
    {
        en: 'send up',
        description: 'Imitate/impersonate for comic effect.'
    },
    {
        en: 'set about',
        description: 'Start doing something.'
    },
    {
        en: 'set about',
        description: 'Attack.'
    },
    {
        en: 'set apart',
        description: 'Distinguish, be better than or different from others.'
    },
    {
        en: 'set aside',
        description: 'Overturn a court verdict or decision.'
    },
    {
        en: 'set back',
        description: 'Cost.'
    },
    {
        en: 'set back',
        description: 'Delay.'
    },
    {
        en: 'set forth',
        description: 'State or outline an opinion.'
    },
    {
        en: 'set forth',
        description: 'Start a journey.'
    },
    {
        en: 'set in',
        description: 'Change season noticeably.'
    },
    {
        en: 'set off',
        description: 'Explode a bomb.'
    },
    {
        en: 'set off',
        description: 'Ring an alarm.'
    },
    {
        en: 'set off',
        description: 'Start a journey.'
    },
    {
        en: 'set off',
        description: 'Counterbalance a debt.'
    },
    {
        en: 'set off',
        description: 'Provide a visual contrast that looks good.'
    },
    {
        en: 'set off',
        description: 'Cause, trigger events.'
    },
    {
        en: 'set on',
        description: 'Attack.'
    },
    {
        en: 'set out',
        description: 'Display, show.'
    },
    {
        en: 'set out',
        description: 'Start a journey.'
    },
    {
        en: 'set out',
        description: 'Arrange, organise.'
    },
    {
        en: 'set to',
        description: 'Work hard or enthusiastically.'
    },
    {
        en: 'set up',
        description: 'Prepare equipment, software, etc., for use.'
    },
    {
        en: 'set up',
        description: 'Start a company.'
    },
    {
        en: 'set up',
        description: 'Provide someone with the money needed to live.'
    },
    {
        en: 'set up',
        description: 'Trick, deceive.'
    },
    {
        en: 'set upon',
        description: 'Attack.'
    },
    {
        en: 'settle down',
        description: 'Start living a fixed and routine life.'
    },
    {
        en: 'settle for',
        description: 'Accept whatever is available.'
    },
    {
        en: 'settle in',
        description: 'Get used to.'
    },
    {
        en: 'settle on',
        description: 'Agree.'
    },
    {
        en: 'settle up',
        description: 'Pay a debt.'
    },
    {
        en: 'sex up',
        description: 'Change information to make it more attractive to the reader or listener.'
    },
    {
        en: 'shack up',
        description: 'Live with someone when you are in a relationship..'
    },
    {
        en: 'shack up',
        description: 'Live somewhere temporarily.'
    },
    {
        en: 'shade in',
        description: 'Make a part of a picture darker.'
    },
    {
        en: 'shake down',
        description: 'Search.'
    },
    {
        en: 'shake down',
        description: 'Extort or cheat money from someone.'
    },
    {
        en: 'shake off',
        description: 'Get rid of an illness.'
    },
    {
        en: 'shake out',
        description: 'Shake clothes, cloths, etc to remove dirt or creases.'
    },
    {
        en: 'shake up',
        description: 'Upset or shock.'
    },
    {
        en: 'shake up',
        description: 'Make major changes to  improve or save a company, organisation, etc.'
    },
    {
        en: 'shake up',
        description: 'Mix things in a container by shaking hard.'
    },
    {
        en: 'shape up',
        description: 'Develop in a positive way.'
    },
    {
        en: 'shape up',
        description: 'Improve to reach an acceptable standard.'
    },
    {
        en: 'shave off',
        description: 'Shave completely.'
    },
    {
        en: 'shave off',
        description: 'Reduce by a small amount.'
    },
    {
        en: 'shell out',
        description: 'Spend money on something, especially when you think it\'s too expensive.'
    },
    {
        en: 'ship off',
        description: 'Send someone away, often because of a problem.'
    },
    {
        en: 'ship out',
        description: 'Send goods to a place.'
    },
    {
        en: 'ship out',
        description: 'Leave a place.'
    },
    {
        en: 'shoot away',
        description: 'Leave somewhere quickly.'
    },
    {
        en: 'shoot back',
        description: 'Return quickly.'
    },
    {
        en: 'shoot for',
        description: 'Have as a goal.'
    },
    {
        en: 'shoot off',
        description: 'Leave promptly and quickly.'
    },
    {
        en: 'shoot out',
        description: 'Go out for a short time.'
    },
    {
        en: 'shoot up',
        description: 'Increase quickly.'
    },
    {
        en: 'shoot up',
        description: 'Take illicit dr*gs intravenously..'
    },
    {
        en: 'shoot up',
        description: 'Damage with gun-shots.'
    },
    {
        en: 'shoot up',
        description: 'Increase quickly, grow.'
    },
    {
        en: 'shop around',
        description: 'Look around for the best price, quality, etc..'
    },
    {
        en: 'short out',
        description: 'Short circuit.'
    },
    {
        en: 'shout down',
        description: 'Make so much noise to stop someone being heard.'
    },
    {
        en: 'shout out',
        description: 'Say something loudly, often to attract someone\'s attention.'
    },
    {
        en: 'show around',
        description: 'Take someone to a place to show them certain parts.'
    },
    {
        en: 'show in',
        description: 'Take someone into an office or other room.'
    },
    {
        en: 'show off',
        description: 'Behave in a way so as to attract attention.'
    },
    {
        en: 'show off',
        description: 'Display something you are proud of.'
    },
    {
        en: 'show off',
        description: 'Make the qualities of another thing more apparent.'
    },
    {
        en: 'show out',
        description: 'Take someone to out of a room or building.'
    },
    {
        en: 'show over',
        description: 'Take someone around a site.'
    },
    {
        en: 'show round',
        description: 'Take someone to a place to show them certain parts.'
    },
    {
        en: 'show through',
        description: 'When a feeling can be seen despite attempts to conceal it.'
    },
    {
        en: 'show up',
        description: 'Attend something or arrive somewhere.'
    },
    {
        en: 'show up',
        description: 'Become clear or apparent.'
    },
    {
        en: 'show up',
        description: 'Make someone feel embarrassed or ashamed.'
    },
    {
        en: 'shrug off',
        description: 'Disregard something, not consider it important or harmful.'
    },
    {
        en: 'shut away',
        description: 'Imprison or remove someone\'s freedom.'
    },
    {
        en: 'shut down',
        description: 'Close a business, shop, etc..'
    },
    {
        en: 'shut down',
        description: 'Turn a computer off.'
    },
    {
        en: 'shut in',
        description: 'Prevent someone from leaving.'
    },
    {
        en: 'shut off',
        description: 'Close, prevent access.'
    },
    {
        en: 'shut out',
        description: 'Exclude.'
    },
    {
        en: 'shut out',
        description: 'Not allow a player or team to score.'
    },
    {
        en: 'shut out of',
        description: 'Exclude someone from an activity, etc.'
    },
    {
        en: 'shut up',
        description: 'Stop talking or making noise.'
    },
    {
        en: 'shut up',
        description: 'Close for a period of time.'
    },
    {
        en: 'shut yourself away',
        description: 'Withdraw from company.'
    },
    {
        en: 'shy away from',
        description: 'Avoid doing something because you lack confidence.'
    },
    {
        en: 'side with',
        description: 'Support someone.'
    },
    {
        en: 'sidle up to',
        description: 'Approach someone discreetly.'
    },
    {
        en: 'sift through',
        description: 'Examine a lot of things carefully.'
    },
    {
        en: 'sign away',
        description: 'Give away legal or property rights.'
    },
    {
        en: 'sign for',
        description: 'Write a signature on behalf on someone.'
    },
    {
        en: 'sign in',
        description: 'Register in a hotel.'
    },
    {
        en: 'sign in',
        description: 'Open a computer program that requires a name and password.'
    },
    {
        en: 'sign in',
        description: 'Write your name when entering a place.'
    },
    {
        en: 'sign into',
        description: 'Open a particular computer program that requires a name and password.'
    },
    {
        en: 'sign off',
        description: 'End a message.'
    },
    {
        en: 'sign off',
        description: 'Close a claim for unemployment benefit.'
    },
    {
        en: 'sign off',
        description: 'Stop doing something to leave.'
    },
    {
        en: 'sign off',
        description: 'Give someone a letter to be away from work.'
    },
    {
        en: 'sign off on',
        description: 'Give official approval.'
    },
    {
        en: 'sign on',
        description: 'Open a claim for unemployment benefit.'
    },
    {
        en: 'sign on',
        description: 'Agree to participate.'
    },
    {
        en: 'sign on',
        description: 'Start broadcasting.'
    },
    {
        en: 'sign on',
        description: 'Employ.'
    },
    {
        en: 'sign on with',
        description: 'Sign a document joining or agreeing to something.'
    },
    {
        en: 'sign out',
        description: 'Close a computer program that requires a name and password.'
    },
    {
        en: 'sign out',
        description: 'Sign something to show you have borrowed something.'
    },
    {
        en: 'sign out of',
        description: 'Close a particular computer program that requires a name and password.'
    },
    {
        en: 'sign up',
        description: 'Give your name to do something.'
    },
    {
        en: 'sign up',
        description: 'Subscribe.'
    },
    {
        en: 'sign with',
        description: 'Make a contract with.'
    },
    {
        en: 'simmer down',
        description: 'Become calmer, make less noise.'
    },
    {
        en: 'sing along',
        description: 'To sing when a piece of music is being played or performed by someone else..'
    },
    {
        en: 'sing out',
        description: 'Reply loudly.'
    },
    {
        en: 'sing out',
        description: 'Sing loudly.'
    },
    {
        en: 'sing up',
        description: 'Sing louder.'
    },
    {
        en: 'single out',
        description: 'Select or choose one from a group.'
    },
    {
        en: 'sink in',
        description: 'Slowly come to be understood.'
    },
    {
        en: 'sit about',
        description: 'Sit and do nothing, especially when you should be working.'
    },
    {
        en: 'sit around',
        description: 'Sit idly, doing nothing.'
    },
    {
        en: 'sit back',
        description: 'Wait for something to happen without making any effort.'
    },
    {
        en: 'sit back',
        description: 'Relax in a chair.'
    },
    {
        en: 'sit by',
        description: 'Not try to stop something.'
    },
    {
        en: 'sit down',
        description: 'Help someone to sit.'
    },
    {
        en: 'sit for',
        description: 'Pose for an artist or photographer.'
    },
    {
        en: 'sit for',
        description: 'Look after children while their parents are out.'
    },
    {
        en: 'sit in',
        description: 'Occupy a building to protest about something.'
    },
    {
        en: 'sit in for',
        description: 'Take on someone\'s responsibilities while they are absent.'
    },
    {
        en: 'sit in on',
        description: 'Attend as an observer.'
    },
    {
        en: 'sit on',
        description: 'Be on a committee.'
    },
    {
        en: 'sit on',
        description: 'To handle somebody firmly who behaves impertinently, conceitedly.'
    },
    {
        en: 'sit on',
        description: 'Hold information back or keep it secret.'
    },
    {
        en: 'sit out',
        description: 'Not take part.'
    },
    {
        en: 'sit over',
        description: 'Eat or drink slowly.'
    },
    {
        en: 'sit through',
        description: 'Stay till the end of something dull.'
    },
    {
        en: 'sit with',
        description: 'Reconcile different positions.'
    },
    {
        en: 'size up',
        description: 'Assess a situation or person carefully..'
    },
    {
        en: 'size up',
        description: 'Make something bigger or produce bigger products.'
    },
    {
        en: 'skin up',
        description: 'Make a cannabis joint.'
    },
    {
        en: 'skin up',
        description: 'Make a cannabis  joint.'
    },
    {
        en: 'skive off',
        description: 'Avoid doing work or other duty.'
    },
    {
        en: 'slack off',
        description: 'Reduce one\'s effort, perform with less enthusiasm and energy.'
    },
    {
        en: 'slacken off',
        description: 'Become less busy or intense.'
    },
    {
        en: 'slag off',
        description: 'Criticise heavily.'
    },
    {
        en: 'slant toward',
        description: 'Favour one viewpoint, bias.'
    },
    {
        en: 'sleep in',
        description: 'Sleep longer than usual.'
    },
    {
        en: 'sleep off',
        description: 'Sleep in order to recover from excess al*oh*l, dr*gs, etc..'
    },
    {
        en: 'sleep on',
        description: 'Think about something.'
    },
    {
        en: 'sleep over',
        description: 'Spend the night at someone else\'s house.'
    },
    {
        en: 'sleep through',
        description: 'Not wake up.'
    },
    {
        en: 'slice off',
        description: 'Cut, remove an amount or part of something.'
    },
    {
        en: 'slice up',
        description: 'Cut completely into pieces or slices.'
    },
    {
        en: 'slip away',
        description: 'Lose an opportunity or the chance of winning, succeeding, etc.'
    },
    {
        en: 'slip away',
        description: 'Pass quickly (time).'
    },
    {
        en: 'slip by',
        description: 'Pass quickly (time).'
    },
    {
        en: 'slip by',
        description: 'Lose an opportunity or the chance of winning, succeeding, etc.'
    },
    {
        en: 'slip down',
        description: 'Be enjoyable to drink or eat.'
    },
    {
        en: 'slip in',
        description: 'Try to include something discreetly when speaking.'
    },
    {
        en: 'slip into',
        description: 'Put clothes on quickly.'
    },
    {
        en: 'slip into',
        description: 'Acquire bad habits or fall into a bad or negative state or condition.'
    },
    {
        en: 'slip off',
        description: 'Leave a place discreetly.'
    },
    {
        en: 'slip off',
        description: 'Remove clothes.'
    },
    {
        en: 'slip off to',
        description: 'Go somewhere discreetly.'
    },
    {
        en: 'slip on',
        description: 'Put clothes on quickly.'
    },
    {
        en: 'slip out',
        description: 'Leave discreetly.'
    },
    {
        en: 'slip up',
        description: 'Make an error.'
    },
    {
        en: 'slob about',
        description: 'Be lazy, do nothing.'
    },
    {
        en: 'slob around',
        description: 'Be lazy, do nothing.'
    },
    {
        en: 'slope off',
        description: 'Leave somewhere without letting others know.'
    },
    {
        en: 'slough off',
        description: 'Get rid of, dispose.'
    },
    {
        en: 'slough off',
        description: 'Lose or shed outer layers of skin.'
    },
    {
        en: 'slough off',
        description: 'Ignore or trivialize an injury or insult.'
    },
    {
        en: 'slow down',
        description: 'Reduce speed.'
    },
    {
        en: 'slow down',
        description: 'Become less active.'
    },
    {
        en: 'slow up',
        description: 'Slow the progress of something.'
    },
    {
        en: 'slug it out',
        description: 'Fight or argue.'
    },
    {
        en: 'smack of',
        description: 'Appear to have a negative quality.'
    },
    {
        en: 'smash down',
        description: 'Demolish or break something down.'
    },
    {
        en: 'smash in',
        description: 'Break something by hitting it repeatedly.'
    },
    {
        en: 'smash up',
        description: 'Destroy, break into many pieces.'
    },
    {
        en: 'smoke out',
        description: 'Force someone out of a place they\'re hiding in.'
    },
    {
        en: 'snaffle up',
        description: 'Consume, take, buy something other people may want.'
    },
    {
        en: 'snap off',
        description: 'Break a piece off something.'
    },
    {
        en: 'snap out of',
        description: 'Control negative emotions.'
    },
    {
        en: 'snap to it!',
        description: 'Do something quickly.'
    },
    {
        en: 'snap up',
        description: 'Get, acquire or buy something quickly.'
    },
    {
        en: 'snarl up',
        description: 'Entangle.'
    },
    {
        en: 'sneak out',
        description: 'Depart furtively.'
    },
    {
        en: 'sneak up on',
        description: 'Approach someone furtively.'
    },
    {
        en: 'sniff around',
        description: 'Look around to see how good something is or to try to find something better.'
    },
    {
        en: 'sniff at',
        description: 'Disapprove or be scornful.'
    },
    {
        en: 'sniff out',
        description: 'Find something by smell (usually for dogs).'
    },
    {
        en: 'sniff out',
        description: 'Find out information, especially when people don\'t want anyone to know.'
    },
    {
        en: 'snitch on',
        description: 'Divulge secrets, inform authorities about someone.'
    },
    {
        en: 'snuff out',
        description: 'Extinguish a small flame by covering it.'
    },
    {
        en: 'snuff out',
        description: 'Kill.'
    },
    {
        en: 'snuff out',
        description: 'End something suddenly.'
    },
    {
        en: 'sober up',
        description: 'Stop showing the effects of al*oh*l or dr*gs.'
    },
    {
        en: 'soften up',
        description: 'Weaken.'
    },
    {
        en: 'soften up',
        description: 'Do things to please someone in the hope that they will do what you want.'
    },
    {
        en: 'soldier on',
        description: 'Continue even when things get difficult.'
    },
    {
        en: 'sort out',
        description: 'Resolve a problem.'
    },
    {
        en: 'sound off',
        description: 'To express your opinions forcefully.'
    },
    {
        en: 'sound out',
        description: 'Check what someone thinks about an issue, idea, etc..'
    },
    {
        en: 'spaff away',
        description: 'Waste (money, time, resources, etc).'
    },
    {
        en: 'spark off',
        description: 'Cause something, usually unpleasant, to happen.'
    },
    {
        en: 'spark up',
        description: 'Light a cigarette or joint.'
    },
    {
        en: 'speak out',
        description: 'Talk openly and freely.'
    },
    {
        en: 'speak up',
        description: 'Talk more loudly.'
    },
    {
        en: 'spell out',
        description: 'Explain something in great detail.'
    },
    {
        en: 'spell out',
        description: 'Write or say the individual letters that make up a word.'
    },
    {
        en: 'spew out',
        description: 'Expel, throw out.'
    },
    {
        en: 'spew up',
        description: 'Vomit.'
    },
    {
        en: 'spill out',
        description: 'When large numbers of people leave a place at the same time.'
    },
    {
        en: 'spill out',
        description: 'Come or flow out of a box, container, etc.'
    },
    {
        en: 'spill out',
        description: 'Express or display emotions openly.'
    },
    {
        en: 'spill over',
        description: 'When something bad has a wider impact on other people or situations.'
    },
    {
        en: 'spill over',
        description: 'Flow over the edge or top of a container.'
    },
    {
        en: 'spin off',
        description: 'Produce an unexpected additional benefit.'
    },
    {
        en: 'spin off',
        description: 'Form a separate company from part of an existing one.'
    },
    {
        en: 'spin off',
        description: 'Create a TV show using characters from a popular show.'
    },
    {
        en: 'spin out',
        description: 'Lose control (vehicle).'
    },
    {
        en: 'spin out',
        description: 'Make something last as long as possible.'
    },
    {
        en: 'spirit away',
        description: 'Remove someone secretly from a place.'
    },
    {
        en: 'spirit off',
        description: 'Remove someone secretly from a place.'
    },
    {
        en: 'spit it out',
        description: 'An informal way of telling someone to say something they are unwilling to say.'
    },
    {
        en: 'spit out',
        description: 'Say something angrily.'
    },
    {
        en: 'splash down',
        description: 'Land in the sea (space capsules).'
    },
    {
        en: 'splash out',
        description: 'Spend a lot of money on something that is not essential.'
    },
    {
        en: 'splash out on',
        description: 'Spend a lot of money on something.'
    },
    {
        en: 'split up',
        description: 'Divide into groups.'
    },
    {
        en: 'split up',
        description: 'Finish a relationship.'
    },
    {
        en: 'spoil for',
        description: 'Really want something.'
    },
    {
        en: 'sponge down',
        description: 'Clean something with a sponge.'
    },
    {
        en: 'sponge off',
        description: 'Accept free food and support without any shame or qualms.'
    },
    {
        en: 'sponge on',
        description: 'Accept or get money without doing any work.'
    },
    {
        en: 'spring back',
        description: 'Return to original position after being bent, forced or when pressure is removed.'
    },
    {
        en: 'spring for',
        description: 'Pay for, often generously.'
    },
    {
        en: 'spring from',
        description: 'Appear suddenly and unexpectedly.'
    },
    {
        en: 'spring from',
        description: 'Be the cause of something.'
    },
    {
        en: 'spring on',
        description: 'Surprise someone.'
    },
    {
        en: 'spring up',
        description: 'Appear suddenly.'
    },
    {
        en: 'spruce up',
        description: 'To smarten, make something neat and tidy.'
    },
    {
        en: 'spur on',
        description: 'Encourage someone to continue.'
    },
    {
        en: 'square away',
        description: 'Finish or sort something out.'
    },
    {
        en: 'square off',
        description: 'Confront someone or prepare to fight them.'
    },
    {
        en: 'square off against',
        description: 'Confront someone or prepare to fight them.'
    },
    {
        en: 'square up',
        description: 'Pay back a debt.'
    },
    {
        en: 'square up',
        description: 'Confront someone or prepare to fight them.'
    },
    {
        en: 'square up to',
        description: 'Accept responsibility or guilt.'
    },
    {
        en: 'square with',
        description: 'Match, conform to.'
    },
    {
        en: 'square with',
        description: 'Check with someone that something is OK.'
    },
    {
        en: 'squeeze up',
        description: 'Get more people into a space than normal or comfortable.'
    },
    {
        en: 'stack up',
        description: 'Put things in a pile.'
    },
    {
        en: 'stack up',
        description: 'Accumulate.'
    },
    {
        en: 'stack up',
        description: 'Increase, accumulate something.'
    },
    {
        en: 'stack up',
        description: 'Be logical, make sense.'
    },
    {
        en: 'stack up',
        description: 'Build up the number of planes waiting to land at an airport.'
    },
    {
        en: 'stack up against',
        description: 'Be as good as something.'
    },
    {
        en: 'staff up',
        description: 'Employ someone for something specific.'
    },
    {
        en: 'stamp out',
        description: 'Get rid of something.'
    },
    {
        en: 'stand about',
        description: 'Spend time in a place waiting or doing nothing or very little.'
    },
    {
        en: 'stand around',
        description: 'Spend time in a place waiting or doing nothing or very little.'
    },
    {
        en: 'stand aside',
        description: 'Leave a position so that someone else can take it.'
    },
    {
        en: 'stand back',
        description: 'Keep a distance from something.'
    },
    {
        en: 'stand back',
        description: 'Try to understand something by taking a different perspective.'
    },
    {
        en: 'stand by',
        description: 'Support someone.'
    },
    {
        en: 'stand by',
        description: 'Be ready and waiting for something to happen.'
    },
    {
        en: 'stand down',
        description: 'Leave a job or position so that someone else can take it.'
    },
    {
        en: 'stand down',
        description: 'Finish being asked questions in a court.'
    },
    {
        en: 'stand for',
        description: 'Accept or tolerate behaviour.'
    },
    {
        en: 'stand for',
        description: 'The words represented by certain initials.'
    },
    {
        en: 'stand in for',
        description: 'Substitute someone temporarily.'
    },
    {
        en: 'stand out',
        description: 'Be extraordinary and different.'
    },
    {
        en: 'stand up',
        description: 'Move from a sitting or lying down to a vertical position.'
    },
    {
        en: 'stand up',
        description: 'Fail to keep an appointment.'
    },
    {
        en: 'stand up for',
        description: 'Defend, support.'
    },
    {
        en: 'stand up to',
        description: 'Keep your principles when challenged by an authority.'
    },
    {
        en: 'stand up to',
        description: 'Resist damage.'
    },
    {
        en: 'stare down',
        description: 'Look at someone until they cannot look at you.'
    },
    {
        en: 'start off',
        description: 'Make something start.'
    },
    {
        en: 'start off',
        description: 'Begin life, a career or existence.'
    },
    {
        en: 'start off',
        description: 'Begin a journey.'
    },
    {
        en: 'start off',
        description: 'Make someone laugh.'
    },
    {
        en: 'start off on',
        description: 'Help someone to start a piece or work or activity.'
    },
    {
        en: 'start on',
        description: 'Begin to use or consume.'
    },
    {
        en: 'start on',
        description: 'Criticise angrily.'
    },
    {
        en: 'start on at',
        description: 'Criticise or nag.'
    },
    {
        en: 'start out',
        description: 'Begin a journey.'
    },
    {
        en: 'start out as',
        description: 'Begin life, existence or a career.'
    },
    {
        en: 'start out to',
        description: 'Intend, plan.'
    },
    {
        en: 'start over',
        description: 'Begin something again.'
    },
    {
        en: 'start up',
        description: 'Open a business.'
    },
    {
        en: 'start up',
        description: 'Begin, especially sounds.'
    },
    {
        en: 'start up',
        description: 'When an engine starts working.'
    },
    {
        en: 'start up',
        description: 'Make an engine work.'
    },
    {
        en: 'start up',
        description: 'Sit or stand upright because someone has surprised you.'
    },
    {
        en: 'stash away',
        description: 'Store or hide something in a safe place.'
    },
    {
        en: 'stave in',
        description: 'Push or break something inwards.'
    },
    {
        en: 'stave off',
        description: 'Delay, prevent something from happening.'
    },
    {
        en: 'stay away',
        description: 'Not come.'
    },
    {
        en: 'stay away from',
        description: 'Avoid, not come.'
    },
    {
        en: 'stay in',
        description: 'Not go out.'
    },
    {
        en: 'stay on',
        description: 'Remain longer than anticipated.'
    },
    {
        en: 'stay out',
        description: 'Not go home.'
    },
    {
        en: 'stay over',
        description: 'Stay overnight.'
    },
    {
        en: 'stay up',
        description: 'Not go to bed.'
    },
    {
        en: 'steal away',
        description: 'Leave a place quietly or secretly.'
    },
    {
        en: 'steal out',
        description: 'Leave in a stealthy or quiet manner.'
    },
    {
        en: 'steal over',
        description: 'Be gradually overcome by an emotion or feeling.'
    },
    {
        en: 'steal up',
        description: 'Approach quietly or secretly.'
    },
    {
        en: 'steal up on',
        description: 'Approach a place or someone quietly or  secretly.'
    },
    {
        en: 'steer clear of',
        description: 'Avoid.'
    },
    {
        en: 'stem from',
        description: 'Originate, be caused by.'
    },
    {
        en: 'step aside',
        description: 'Leave a job or position so that someone else can take over.'
    },
    {
        en: 'step back',
        description: 'Look at something from a different perspective.'
    },
    {
        en: 'step down',
        description: 'Leave a job or position so that someone can take over.'
    },
    {
        en: 'step down',
        description: 'Reduce.'
    },
    {
        en: 'step forward',
        description: 'Offer help.'
    },
    {
        en: 'step in',
        description: 'Get involved by interrupting something.'
    },
    {
        en: 'step on it',
        description: 'An imperative used to tell someone to go faster, especially when driving.'
    },
    {
        en: 'step out',
        description: 'Leave a place for a very short time.'
    },
    {
        en: 'step to',
        description: 'Confront.'
    },
    {
        en: 'step to',
        description: 'Chat, talk to.'
    },
    {
        en: 'step up',
        description: 'Increase.'
    },
    {
        en: 'stick around',
        description: 'Stay in a place for some time.'
    },
    {
        en: 'stick at',
        description: 'Continue doing something despite difficulties.'
    },
    {
        en: 'stick by',
        description: 'Support someone when they are having difficulties.'
    },
    {
        en: 'stick by',
        description: 'Support a plan, opinion or decision.'
    },
    {
        en: 'stick down',
        description: 'Write something quickly or without thinking about it.'
    },
    {
        en: 'stick down',
        description: 'Join surfaces with glue.'
    },
    {
        en: 'stick it to',
        description: 'Criticise someone.'
    },
    {
        en: 'stick it to',
        description: 'Treat someone badly or unfairly.'
    },
    {
        en: 'stick out',
        description: 'Be easily noticed.'
    },
    {
        en: 'stick out',
        description: 'Extend part of your body.'
    },
    {
        en: 'stick out',
        description: 'Continue doing something difficult or unpleasant.'
    },
    {
        en: 'stick out for',
        description: 'Demand a salary raise.'
    },
    {
        en: 'stick to',
        description: 'Not change.'
    },
    {
        en: 'stick to',
        description: 'Restrict or limit and not change.'
    },
    {
        en: 'stick together',
        description: 'Support each other.'
    },
    {
        en: 'stick up',
        description: 'Stand on end.'
    },
    {
        en: 'stick up',
        description: 'Rob using weapons.'
    },
    {
        en: 'stick up for',
        description: 'Support or defend.'
    },
    {
        en: 'stick with',
        description: 'Not change something.'
    },
    {
        en: 'stick with',
        description: 'Stay near someone.'
    },
    {
        en: 'stick with',
        description: 'Not be forgotten.'
    },
    {
        en: 'stick with',
        description: 'Continue with something difficult or unpleasant.'
    },
    {
        en: 'stiffen up',
        description: 'Become rigid.'
    },
    {
        en: 'stiffen up',
        description: 'Make something rigid.'
    },
    {
        en: 'stir up',
        description: 'Make trouble for someone else.'
    },
    {
        en: 'stitch up',
        description: 'Sew something so that it is closed.'
    },
    {
        en: 'stitch up',
        description: 'Finalise a deal.'
    },
    {
        en: 'stitch up',
        description: 'Cheat someone or make them look guilty when they aren\'t.'
    },
    {
        en: 'stomp off',
        description: 'Leave somewhere angrily.'
    },
    {
        en: 'stomp on',
        description: 'Treat badly or defeat.'
    },
    {
        en: 'stop around',
        description: 'Visit someone for a short time..'
    },
    {
        en: 'stop back',
        description: 'Return somewhere.'
    },
    {
        en: 'stop behind',
        description: 'Stay somewhere when other people leave.'
    },
    {
        en: 'stop by',
        description: 'Visit somewhere briefly or quickly.'
    },
    {
        en: 'stop in',
        description: 'Stay at home.'
    },
    {
        en: 'stop in',
        description: 'Visit briefly.'
    },
    {
        en: 'stop off',
        description: 'Break a journey.'
    },
    {
        en: 'stop out',
        description: 'Be out late, especially when you are expected home.'
    },
    {
        en: 'stop over',
        description: 'Stay somewhere when on a journey.'
    },
    {
        en: 'stop up',
        description: 'Stay up late.'
    },
    {
        en: 'stop up',
        description: 'Fill or block something.'
    },
    {
        en: 'storm off',
        description: 'Leave a place angrily.'
    },
    {
        en: 'storm out',
        description: 'Leave a place angrily.'
    },
    {
        en: 'stow away',
        description: 'Hide in a vehicle to travel without people knowing.'
    },
    {
        en: 'stow away',
        description: 'Store something in a safe place.'
    },
    {
        en: 'straighten out',
        description: 'Make something straight.'
    },
    {
        en: 'straighten out',
        description: 'Deal with a problem.'
    },
    {
        en: 'straighten out',
        description: 'Make clear and resolve.'
    },
    {
        en: 'straighten out',
        description: 'Improve someone\'s behaviour.'
    },
    {
        en: 'straighten up',
        description: 'Stand straight.'
    },
    {
        en: 'straighten up',
        description: 'Tidy.'
    },
    {
        en: 'strike back',
        description: 'Attack, take action against someone who has hurt you.'
    },
    {
        en: 'strike down',
        description: 'Kill.'
    },
    {
        en: 'strike down',
        description: 'Make someone ill.'
    },
    {
        en: 'strike down',
        description: 'Disallow a law, decision, etc.'
    },
    {
        en: 'strike off',
        description: 'Remove someone\'s professional licence to practise.'
    },
    {
        en: 'strike on',
        description: 'Have a good idea.'
    },
    {
        en: 'strike out',
        description: 'Start doing something new and different.'
    },
    {
        en: 'strike out',
        description: 'Try to hit someone.'
    },
    {
        en: 'strike out',
        description: 'Start going towards a place.'
    },
    {
        en: 'strike out',
        description: 'Cross writing out.'
    },
    {
        en: 'strike out',
        description: 'Fail.'
    },
    {
        en: 'strike up',
        description: 'Start (conversation, relationship).'
    },
    {
        en: 'strike up',
        description: 'Start performing music.'
    },
    {
        en: 'strike upon',
        description: 'Have a good idea.'
    },
    {
        en: 'string along',
        description: 'Deceive someone for a long time.'
    },
    {
        en: 'string along',
        description: 'Accompany someone because you haven\'t got anything better to do.'
    },
    {
        en: 'string out',
        description: 'Make something last as long as possible.'
    },
    {
        en: 'string together',
        description: 'Put words together into a coherent text.'
    },
    {
        en: 'string up',
        description: 'Hang somebody.'
    },
    {
        en: 'stub out',
        description: 'Extinguish a cigarette.'
    },
    {
        en: 'stuff up',
        description: 'Make a mistake, do badly, spoil.'
    },
    {
        en: 'stumble across',
        description: 'Find something accidentally.'
    },
    {
        en: 'stumble upon',
        description: 'Find something accidentally.'
    },
    {
        en: 'stump up',
        description: 'Pay for something.'
    },
    {
        en: 'suck in',
        description: 'Become involved in something unpleasant.'
    },
    {
        en: 'suck into',
        description: 'Become involved in something unpleasant.'
    },
    {
        en: 'suck up',
        description: 'Try to  ingratiate yourself.'
    },
    {
        en: 'suck up to',
        description: 'Ingratiate yourself with someone.'
    },
    {
        en: 'suit up',
        description: 'Get dressed or put on a uniform for an activity or task.'
    },
    {
        en: 'sum up',
        description: 'Summarise.'
    },
    {
        en: 'summon up',
        description: 'Get the energy or courage to do something.'
    },
    {
        en: 'suss out',
        description: 'Come to understand.'
    },
    {
        en: 'swan about',
        description: 'Move in a dramatic or affected manner.'
    },
    {
        en: 'swan around',
        description: 'Move in a dramatic or affected manner.'
    },
    {
        en: 'swan in',
        description: 'Enter in a dramatic or attention-seeking manner.'
    },
    {
        en: 'swan off',
        description: 'Leave somewhere in a defiant or pompous manner.'
    },
    {
        en: 'swear by',
        description: 'Have great confidence in.'
    },
    {
        en: 'swear down',
        description: 'Promise that something is true.'
    },
    {
        en: 'sweep through',
        description: 'Pass easily, succeed.'
    },
    {
        en: 'sweep through',
        description: 'Move quickly through.'
    },
    {
        en: 'swing around',
        description: 'Change your opinion quickly.'
    },
    {
        en: 'swing around',
        description: 'Turn around quickly.'
    },
    {
        en: 'swing at',
        description: 'Try to hit.'
    },
    {
        en: 'swing by',
        description: 'Visit a person or place on your way somewhere.'
    },
    {
        en: 'swing round',
        description: 'Change your opinion quickly.'
    },
    {
        en: 'swing round',
        description: 'Turn around quickly.'
    },
    {
        en: 'syphon off',
        description: 'Take business, support or votes from someone.'
    },
    {
        en: 'syphon off',
        description: 'Divert money illegally.'
    },
    {
        en: 'tack on',
        description: 'Add something that wasn\'t planned.'
    },
    {
        en: 'tack onto',
        description: 'Add or attach something that wasn\'t planned to something.'
    },
    {
        en: 'tag along',
        description: 'Accompany someone, especially if they haven\'t specifically invited you.'
    },
    {
        en: 'tag on',
        description: 'Add an additional point to something written or spoken.'
    },
    {
        en: 'tag onto',
        description: 'Add an additional point to something written or spoken.'
    },
    {
        en: 'tag with',
        description: 'Add a keyword link or bookmark to a blog entry or webpage.'
    },
    {
        en: 'tail away',
        description: 'Become silent or inaudible.'
    },
    {
        en: 'tail back',
        description: 'Form a traffic jam.'
    },
    {
        en: 'tail off',
        description: 'Become silent or inaudible.'
    },
    {
        en: 'tail off',
        description: 'Decrease.'
    },
    {
        en: 'take after',
        description: 'Look like, resemble.'
    },
    {
        en: 'take apart',
        description: 'Take something to pieces.'
    },
    {
        en: 'take aside',
        description: 'Get someone alone to talk to them.'
    },
    {
        en: 'take away',
        description: 'Remove.'
    },
    {
        en: 'take back',
        description: 'Make someone nostalgic.'
    },
    {
        en: 'take back',
        description: 'Retract a statement, admit that something was wrong.'
    },
    {
        en: 'take down',
        description: 'Make notes or write down in full.'
    },
    {
        en: 'take down',
        description: 'Remove.'
    },
    {
        en: 'take in',
        description: 'Absorb information.'
    },
    {
        en: 'take in',
        description: 'Deceive.'
    },
    {
        en: 'take in',
        description: 'Make clothes smaller.'
    },
    {
        en: 'take in',
        description: 'Assume care or support.'
    },
    {
        en: 'take it',
        description: 'Accept criticism.'
    },
    {
        en: 'take it out on',
        description: 'Abuse someone because you\'re angry.'
    },
    {
        en: 'take it upon yourself',
        description: 'Take responsibility, often without consulting other people.'
    },
    {
        en: 'take off',
        description: 'Make great progress.'
    },
    {
        en: 'take off',
        description: 'Reduce the price of an item.'
    },
    {
        en: 'take off',
        description: 'When a plane departs or leaves the ground.'
    },
    {
        en: 'take off',
        description: 'Remove.'
    },
    {
        en: 'take on',
        description: 'Allow passengers on a ship or plane.'
    },
    {
        en: 'take on',
        description: 'Assume a responsibility.'
    },
    {
        en: 'take on',
        description: 'Employ.'
    },
    {
        en: 'take out',
        description: 'Borrow a library book.'
    },
    {
        en: 'take out',
        description: 'Borrow money from a bank or other official lender.'
    },
    {
        en: 'take out',
        description: 'Extract or remove.'
    },
    {
        en: 'take out',
        description: 'Go out socially with someone, especially a date.'
    },
    {
        en: 'take out',
        description: 'Obtain insurance.'
    },
    {
        en: 'take out',
        description: 'Kill, murder.'
    },
    {
        en: 'take over',
        description: 'Assume control of a company or organisation.'
    },
    {
        en: 'take over',
        description: 'Start a job or position that someone had occupied before you.'
    },
    {
        en: 'take through',
        description: 'Explain something to someone.'
    },
    {
        en: 'take to',
        description: 'Make a habit of something.'
    },
    {
        en: 'take up',
        description: 'Fill or occupy time or space.'
    },
    {
        en: 'take up',
        description: 'Make clothes shorter.'
    },
    {
        en: 'take up',
        description: 'Start a new hobby, pastime, etc..'
    },
    {
        en: 'talk around',
        description: 'Persuade.'
    },
    {
        en: 'talk around',
        description: 'Talk about a problem or issue without really dealing with it.'
    },
    {
        en: 'talk at',
        description: 'Talk to someone and not give them a chance to reply or listen to them.'
    },
    {
        en: 'talk back',
        description: 'Respond rudely to a person in authority.'
    },
    {
        en: 'talk down',
        description: 'Try to make something sound less important.'
    },
    {
        en: 'talk down',
        description: 'Persuade someone not to jump off a high place to kill themselves.'
    },
    {
        en: 'talk down to',
        description: 'Talk in a way to show your superiority not communicate.'
    },
    {
        en: 'talk into',
        description: 'Persuade someone to do something.'
    },
    {
        en: 'talk out',
        description: 'Discuss a problem or issue to find a solution.'
    },
    {
        en: 'talk out of',
        description: 'Persuade someone not to do something.'
    },
    {
        en: 'talk over',
        description: 'Discuss.'
    },
    {
        en: 'talk round',
        description: 'Persuade.'
    },
    {
        en: 'talk round',
        description: 'Talk about a problem or issue without really dealing with it.'
    },
    {
        en: 'talk through',
        description: 'Guide someone through an issue.'
    },
    {
        en: 'talk up',
        description: 'Make something appear more important or significant than it really is.'
    },
    {
        en: 'talk yourself out',
        description: 'Talk until you have nothing left to say.'
    },
    {
        en: 'tap for',
        description: 'Get money off someone.'
    },
    {
        en: 'tap into',
        description: 'Use or exploit a plentiful resource for your benefit.'
    },
    {
        en: 'tap off with',
        description: 'Have s*x with.'
    },
    {
        en: 'tap out',
        description: 'Play a rhythm quietly.'
    },
    {
        en: 'tap out',
        description: 'Use all the money available.'
    },
    {
        en: 'tap up',
        description: 'Approach a footballer illegally to get them to change teams.'
    },
    {
        en: 'team up',
        description: 'Work with someone or a group to achieve something.'
    },
    {
        en: 'tear apart',
        description: 'Disturb or upset greatly.'
    },
    {
        en: 'tear at',
        description: 'Pull or try to pull something to pieces.'
    },
    {
        en: 'tear away',
        description: 'Stop someone doing something unwillingly.'
    },
    {
        en: 'tear away',
        description: 'Remove a surface violently.'
    },
    {
        en: 'tear down',
        description: 'Demolish.'
    },
    {
        en: 'tear into',
        description: 'Criticise strongly or angrily.'
    },
    {
        en: 'tear off',
        description: 'Remove part of a form or letter using your hands, not scissors.'
    },
    {
        en: 'tear off',
        description: 'Leave at high speed.'
    },
    {
        en: 'tear off',
        description: 'Remove with force.'
    },
    {
        en: 'tear out',
        description: 'Depart rapidly.'
    },
    {
        en: 'tear up',
        description: 'Rip into pieces.'
    },
    {
        en: 'tear up',
        description: 'Destroy.'
    },
    {
        en: 'tear up',
        description: 'Have eyes fill with tears.'
    },
    {
        en: 'tee off',
        description: 'Start or launch an event.'
    },
    {
        en: 'tee off',
        description: 'Place a golf ball on a short plastic or wooden stick before hitting it at the start of a hole..'
    },
    {
        en: 'tee off',
        description: 'Annoy someone.'
    },
    {
        en: 'tee off on',
        description: 'Criticise.'
    },
    {
        en: 'tee up',
        description: 'Place a golf ball on a short plastic or wooden stick before hitting it at the start of a hole..'
    },
    {
        en: 'tee up',
        description: 'Make preparations before starting or launching something.'
    },
    {
        en: 'tell apart',
        description: 'See a difference between two things.'
    },
    {
        en: 'tell off',
        description: 'Chide; talk angrily to someone about something they\'ve done wrong..'
    },
    {
        en: 'tell on',
        description: 'Report someone to an authority.'
    },
    {
        en: 'text out',
        description: 'Cancel an appointment by sending a text message.'
    },
    {
        en: 'think over',
        description: 'Consider something carefully.'
    },
    {
        en: 'think through',
        description: 'Consider all the possibilities and outcomes of a situation.'
    },
    {
        en: 'think up',
        description: 'Create or invent something, especially when lying.'
    },
    {
        en: 'throw away',
        description: 'Discard something when no longer needed.'
    },
    {
        en: 'throw in',
        description: 'Join, accompany.'
    },
    {
        en: 'throw in',
        description: 'Add something to a deal.'
    },
    {
        en: 'throw off',
        description: 'Remove item of  clothing quickly.'
    },
    {
        en: 'throw off',
        description: 'Get rid of.'
    },
    {
        en: 'throw off',
        description: 'Produce light or heat.'
    },
    {
        en: 'throw on',
        description: 'Put clothes on quickly.'
    },
    {
        en: 'throw out',
        description: 'Get rid of.'
    },
    {
        en: 'throw out',
        description: 'Dislocate.'
    },
    {
        en: 'throw out',
        description: 'Reject.'
    },
    {
        en: 'throw out',
        description: 'Produce heat, fumes.'
    },
    {
        en: 'throw out',
        description: 'Expel.'
    },
    {
        en: 'throw over',
        description: 'End a relationship with someone.'
    },
    {
        en: 'throw over',
        description: 'Reject, refuse to accept.'
    },
    {
        en: 'throw together',
        description: 'Make or arrange quickly.'
    },
    {
        en: 'throw up',
        description: 'Vomit.'
    },
    {
        en: 'throw up',
        description: 'Produce problems, results, ideas, etc.'
    },
    {
        en: 'throw up',
        description: 'Leave a job or position suddenly.'
    },
    {
        en: 'throw up',
        description: 'Create clouds of dust or splash water into the air.'
    },
    {
        en: 'throw yourself at',
        description: 'Make it clear you are s*xu*lly attracted to someone.'
    },
    {
        en: 'throw yourself into',
        description: 'Do something enthusiastically or energetically.'
    },
    {
        en: 'tick along',
        description: 'Make reasonable progress without any serious problems.'
    },
    {
        en: 'tick away',
        description: 'Pass (of time).'
    },
    {
        en: 'tick by',
        description: 'Pass (of time).'
    },
    {
        en: 'tick off',
        description: 'Annoy.'
    },
    {
        en: 'tick off',
        description: 'Scold.'
    },
    {
        en: 'tick off',
        description: 'Put a mark on an item in a list when it has been dealt with.'
    },
    {
        en: 'tick over',
        description: 'Continue working, but without improving.'
    },
    {
        en: 'tick over',
        description: 'Operate but without moving (engines).'
    },
    {
        en: 'tide over',
        description: 'Use something carefully so as not to finish it.'
    },
    {
        en: 'tidy up',
        description: 'Put things in the correct place in a room.'
    },
    {
        en: 'tie back',
        description: 'Fasten or secure so that it doesn\'t obstruct.'
    },
    {
        en: 'tie down',
        description: 'Secure something to prevent it moving.'
    },
    {
        en: 'tie down',
        description: 'Remove or restrict freedom.'
    },
    {
        en: 'tie down',
        description: 'Stop people (often police or military) going where they are needed.'
    },
    {
        en: 'tie in',
        description: 'Agree, be connected or support.'
    },
    {
        en: 'tie in',
        description: 'Associate with.'
    },
    {
        en: 'tie in with',
        description: 'Occur at the same time.'
    },
    {
        en: 'tie up',
        description: 'Tie or fasten something securely.'
    },
    {
        en: 'tie up',
        description: 'Stop someone doing something.'
    },
    {
        en: 'tie up',
        description: 'Fasten.'
    },
    {
        en: 'tie up',
        description: 'Block a road, etc.'
    },
    {
        en: 'tighten up',
        description: 'Make something more secure or function better.'
    },
    {
        en: 'time out',
        description: 'End or close because of a time limit.'
    },
    {
        en: 'time out',
        description: 'End or close something because of a time limit.'
    },
    {
        en: 'tip off',
        description: 'Secretly inform the police or authorities.'
    },
    {
        en: 'tip over',
        description: 'Spill, make something fall on its side.'
    },
    {
        en: 'tire of',
        description: 'Get bored of something.'
    },
    {
        en: 'tire out',
        description: 'Make someone exhausted.'
    },
    {
        en: 'toddle off',
        description: 'Leave, go home.'
    },
    {
        en: 'tone down',
        description: 'Make something sound more moderate.'
    },
    {
        en: 'tool up',
        description: 'Provide equipment.'
    },
    {
        en: 'tool up',
        description: 'Arm yourself or somebody.'
    },
    {
        en: 'tootle off',
        description: 'Leave, depart.'
    },
    {
        en: 'top off',
        description: 'Finish something in a special way.'
    },
    {
        en: 'top out',
        description: 'Stop increasing, reach the highest point.'
    },
    {
        en: 'top up',
        description: 'Refill something that isn\'t empty yet.'
    },
    {
        en: 'toss about',
        description: 'Discuss something freely and openly, but not very seriously.'
    },
    {
        en: 'toss around',
        description: 'Discuss something freely and openly, but not very seriously.'
    },
    {
        en: 'toss back',
        description: 'Drink quickly.'
    },
    {
        en: 'toss down',
        description: 'Drink quickly.'
    },
    {
        en: 'toss for',
        description: 'Make a decision by throwing a coin and seeing which side lands face up.'
    },
    {
        en: 'toss off',
        description: 'Write something quickly and carelessly.'
    },
    {
        en: 'toss up',
        description: 'Decide something by throwing a coin and seeing which side lands face up..'
    },
    {
        en: 'touch down',
        description: 'Land (planes).'
    },
    {
        en: 'touch for',
        description: 'Borrow money.'
    },
    {
        en: 'touch off',
        description: 'Cause a problem to occur.'
    },
    {
        en: 'touch on',
        description: 'Mention.'
    },
    {
        en: 'touch up',
        description: 'Improve the appearance of something.'
    },
    {
        en: 'touch up',
        description: 'Touch someone in a s*x*al way.'
    },
    {
        en: 'touch upon',
        description: 'Mention.'
    },
    {
        en: 'tow away',
        description: 'Remove a vehicle, especially if parked illegally.'
    },
    {
        en: 'toy at',
        description: 'Pretend to think about or think about in a casual way.'
    },
    {
        en: 'toy over',
        description: 'Think about something.'
    },
    {
        en: 'toy with',
        description: 'Not eat much of a meal.'
    },
    {
        en: 'toy with',
        description: 'Consider something, but not very seriously.'
    },
    {
        en: 'toy with',
        description: 'Move or play with something to occupy your hands.'
    },
    {
        en: 'toy with',
        description: 'Treat insincerely.'
    },
    {
        en: 'track down',
        description: 'Find after a long search.'
    },
    {
        en: 'trade down',
        description: 'Sell something and replace it with something cheaper.'
    },
    {
        en: 'trade in',
        description: 'Exchange something old as part of the price of something new.'
    },
    {
        en: 'trade in',
        description: 'Leave your wife or husband to marry someone younger.'
    },
    {
        en: 'trade off',
        description: 'Bargain, make a deal or compromise.'
    },
    {
        en: 'trade off',
        description: 'Accept something you don\'t really want to get something you do want.'
    },
    {
        en: 'trade on',
        description: 'Exploit, use something to your advantage.'
    },
    {
        en: 'trade up',
        description: 'Buy larger or more expensive items.'
    },
    {
        en: 'trade up',
        description: 'Leave your wife or husband and marry someone better looking, richer, etc.'
    },
    {
        en: 'trade upon',
        description: 'Exploit, use to your advantage.'
    },
    {
        en: 'train up',
        description: 'Teach someone the specific skills they will need to carry out a job or task.'
    },
    {
        en: 'trickle down',
        description: 'Pass benefits from economic expansion through the economy to the less fortunate.'
    },
    {
        en: 'trip out',
        description: 'Be under the influence of psychoactive dr*gs.'
    },
    {
        en: 'trip over',
        description: 'Fall.'
    },
    {
        en: 'trip over',
        description: 'Fall because you hit an obstacle.'
    },
    {
        en: 'trip up',
        description: 'Make a mistake.'
    },
    {
        en: 'trot off',
        description: 'Leave.'
    },
    {
        en: 'trot off to',
        description: 'Go somewhere.'
    },
    {
        en: 'trot out',
        description: 'Make a statement (meant negatively).'
    },
    {
        en: 'trump up',
        description: 'Charge or accuse someone falsely.'
    },
    {
        en: 'try back',
        description: 'Phone back.'
    },
    {
        en: 'try for',
        description: 'Make an attempt to get something.'
    },
    {
        en: 'try it on',
        description: 'Provoke someone by being annoying or behaving badly.'
    },
    {
        en: 'try it on',
        description: 'Attempt to get something, usually by deceit, without great hopes of success.'
    },
    {
        en: 'try on',
        description: 'Put clothes on to see if they fit.'
    },
    {
        en: 'try out',
        description: 'Test.'
    },
    {
        en: 'try out',
        description: 'Test something to see if you like it or want to buy it.'
    },
    {
        en: 'try out for',
        description: 'Be tested for a sports team.'
    },
    {
        en: 'tuck away',
        description: 'Put something in a safe place.'
    },
    {
        en: 'tuck away',
        description: 'Eat a lot.'
    },
    {
        en: 'tuck in',
        description: 'Tidy the ends of items of clothing by placing them inside something.'
    },
    {
        en: 'tuck in',
        description: 'Start eating enthusiastically.'
    },
    {
        en: 'tuck in',
        description: 'Arrange the sheets, duvet or blankets to make someone, usually a child, comfortable in bed.'
    },
    {
        en: 'tuck into',
        description: 'Start eating something.'
    },
    {
        en: 'tuck up',
        description: 'Arrange the sheets, duvet or blankets to make someone, usually a child, comfortable in bed.'
    },
    {
        en: 'tune in',
        description: 'Watch or listen to a TV or radio show.'
    },
    {
        en: 'tune in to',
        description: 'Watch or listen to a TV or radio programme.'
    },
    {
        en: 'tune out',
        description: 'Ignore, not pay attention.'
    },
    {
        en: 'tune up',
        description: 'Improve the performance of a machine or engine.'
    },
    {
        en: 'tune up',
        description: 'Tune a musical instrument before playing.'
    },
    {
        en: 'turn against',
        description: 'Stop liking and start disliking.'
    },
    {
        en: 'turn away',
        description: 'Not allow someone to enter a place.'
    },
    {
        en: 'turn down',
        description: 'Reduce volume, temperature, etc..'
    },
    {
        en: 'turn down',
        description: 'Reject an offer, invitation, etc..'
    },
    {
        en: 'turn down',
        description: 'Fold the top covers of a bed down to make it ready for someone to go to sleep.'
    },
    {
        en: 'turn in',
        description: 'Go to bed.'
    },
    {
        en: 'turn in',
        description: 'Hand in, submit.'
    },
    {
        en: 'turn into',
        description: 'Become.'
    },
    {
        en: 'turn off',
        description: 'Stop a machine.'
    },
    {
        en: 'turn on',
        description: 'Cause someone to feel attraction or pleasure.'
    },
    {
        en: 'turn on',
        description: 'Start a machine.'
    },
    {
        en: 'turn on',
        description: 'Attack.'
    },
    {
        en: 'turn out',
        description: 'Produce.'
    },
    {
        en: 'turn out',
        description: 'Produce an unexpected result.'
    },
    {
        en: 'turn out',
        description: 'Stop a light.'
    },
    {
        en: 'turn out',
        description: 'Attend.'
    },
    {
        en: 'turn over',
        description: 'Give to the authorities.'
    },
    {
        en: 'turn to',
        description: 'Try to get help.'
    },
    {
        en: 'turn to',
        description: 'Take up a habit.'
    },
    {
        en: 'turn up',
        description: 'Appear.'
    },
    {
        en: 'turn up',
        description: 'Increase volume, temperature, etc..'
    },
    {
        en: 'type in',
        description: 'Enter computer data or text.'
    },
    {
        en: 'type out',
        description: 'Write a full or finished version of a text on a computer.'
    },
    {
        en: 'type up',
        description: 'Type a finished version.'
    },
    {
        en: 'urge on',
        description: 'Encourage.'
    },
    {
        en: 'urge on',
        description: 'Persuade or pressure to accept something.'
    },
    {
        en: 'urge upon',
        description: 'Persuade or pressure to accept something.'
    },
    {
        en: 'use up',
        description: 'Finish or consume all of something.'
    },
    {
        en: 'usher in',
        description: 'Be at, mark or celebrate an important point in time.'
    },
    {
        en: 'usher in',
        description: 'Make important changes happen.'
    },
    {
        en: 'vacuum up',
        description: 'Consume.'
    },
    {
        en: 'vamp up',
        description: 'Make something more exciting, attractive, etc.'
    },
    {
        en: 'vamp up',
        description: 'Invent, maker up, improvise.'
    },
    {
        en: 'veg out',
        description: 'Relax, do nothing.'
    },
    {
        en: 'venture forth',
        description: 'Leave somewhere safe or comfortable.'
    },
    {
        en: 'wade in',
        description: 'Start something or get involved, often without thinking or to forcefully.'
    },
    {
        en: 'wade in',
        description: 'Attack.'
    },
    {
        en: 'wade into',
        description: 'Become embroiled or involved in a situation, without thinking or planning usually.'
    },
    {
        en: 'wade through',
        description: 'Get to the end of something with difficulty.'
    },
    {
        en: 'wait about',
        description: 'Wait somewhere doing nothing.'
    },
    {
        en: 'wait around',
        description: 'Wait somewhere doing nothing.'
    },
    {
        en: 'wait behind',
        description: 'Stay somewhere after other people have left.'
    },
    {
        en: 'wait in',
        description: 'Stay at home because someone is going to visit.'
    },
    {
        en: 'wait on',
        description: 'Serve people in a restaurant.'
    },
    {
        en: 'wait on',
        description: 'Sell goods in a shop.'
    },
    {
        en: 'wait on',
        description: 'Provide someone with everything they need or want.'
    },
    {
        en: 'wait on',
        description: 'Wait for a result before being able to make a decision.'
    },
    {
        en: 'wait out',
        description: 'Wait till something has finished, usually something unpleasant.'
    },
    {
        en: 'wait up',
        description: 'Not go to bed because you are waiting.'
    },
    {
        en: 'wait up!',
        description: 'Stop (imperative).'
    },
    {
        en: 'wait upon',
        description: 'Provide someone with what they require.'
    },
    {
        en: 'wait upon',
        description: 'Wait for a result before being able to make a decision.'
    },
    {
        en: 'wake up',
        description: 'Stop sleeping.'
    },
    {
        en: 'walk away from',
        description: 'Leave something you don\'t like.'
    },
    {
        en: 'walk away with',
        description: 'Win easily.'
    },
    {
        en: 'walk back from',
        description: 'Retract a statement.'
    },
    {
        en: 'walk in on',
        description: 'Enter somewhere unexpectedly and see something.'
    },
    {
        en: 'walk into',
        description: 'Get work without effort.'
    },
    {
        en: 'walk into',
        description: 'Be unaware of the presence of something and either enter it (a trap) or bump into it (an obstruction).'
    },
    {
        en: 'walk off',
        description: 'Go for a walk to reduce the effects of an illness or bad feeling.'
    },
    {
        en: 'walk off with',
        description: 'Win easily.'
    },
    {
        en: 'walk off with',
        description: 'Take something without permission or steal.'
    },
    {
        en: 'walk on',
        description: 'Continue walking.'
    },
    {
        en: 'walk out',
        description: 'Leave work because of a dispute with the management.'
    },
    {
        en: 'walk out',
        description: 'Leave a place angrily or because you are not satisfied.'
    },
    {
        en: 'walk out on',
        description: 'Leave somebody angrily.'
    },
    {
        en: 'walk through',
        description: 'Explain or demonstrate something carefully to someone.'
    },
    {
        en: 'walk up',
        description: 'Go to someone.'
    },
    {
        en: 'waltz through',
        description: 'Pass or succeed easily.'
    },
    {
        en: 'wander off',
        description: 'Leave a place, usually without telling other people.'
    },
    {
        en: 'wander off',
        description: 'Stop paying attention.'
    },
    {
        en: 'want out',
        description: 'Want to leave a relationship or arrangement.'
    },
    {
        en: 'warm up',
        description: 'Do exercises before a sport.'
    },
    {
        en: 'wash away',
        description: 'When floods or waves completely remove a structure, building, etc..'
    },
    {
        en: 'wash down',
        description: 'Drink in order to swallow something solid.'
    },
    {
        en: 'wash out',
        description: 'Rain so heavily that an event has to be cancelled.'
    },
    {
        en: 'wash over',
        description: 'Suddenly experience a strong emotion.'
    },
    {
        en: 'wash up',
        description: 'Clean everything used to prepare food and eat it.'
    },
    {
        en: 'wash up',
        description: 'When something in the sea or river is left on the shore or bank.'
    },
    {
        en: 'wash up',
        description: 'Wash face and hands.'
    },
    {
        en: 'waste away',
        description: 'Become very thin and weak, usually due to  illness.'
    },
    {
        en: 'watch out',
        description: 'Be careful (imperative).'
    },
    {
        en: 'watch out for',
        description: 'Be careful of something.'
    },
    {
        en: 'watch over',
        description: 'Keep an eye on something or someone to check that there\'s no trouble.'
    },
    {
        en: 'water down',
        description: 'Make something weaker and less effective.'
    },
    {
        en: 'wave aside',
        description: 'Ignore or refuse to consider what someone says.'
    },
    {
        en: 'wave down',
        description: 'Make a hand signal to stop a vehicle.'
    },
    {
        en: 'wave off',
        description: 'Go to a place where someone is leaving to wave goodbye.'
    },
    {
        en: 'wave on',
        description: 'Make a hand signal to tell someone to keep moving.'
    },
    {
        en: 'wean off',
        description: 'Slowly stop a dependency on something.'
    },
    {
        en: 'wear away',
        description: 'Erode, remove gradually.'
    },
    {
        en: 'wear down',
        description: 'Make something weaker.'
    },
    {
        en: 'wear off',
        description: 'Stop having an effect.'
    },
    {
        en: 'wear out',
        description: 'Use something until it stops working.'
    },
    {
        en: 'weed out',
        description: 'Remove, get rid of.'
    },
    {
        en: 'weigh down on',
        description: 'Burden with responsibilities, duties, etc.'
    },
    {
        en: 'weigh in',
        description: 'Have a certain weight (in sports like boxing).'
    },
    {
        en: 'weigh in',
        description: 'Enter an argument forcefully.'
    },
    {
        en: 'weigh in on',
        description: 'Enter an argument or discussion to express a strongly felt idea.'
    },
    {
        en: 'weigh on',
        description: 'Make someone consider carefully.'
    },
    {
        en: 'weigh out',
        description: 'Measure a certain amount of something by weight.'
    },
    {
        en: 'weigh up',
        description: 'Assess.'
    },
    {
        en: 'weird out',
        description: 'Disturb, cause concern or worry.'
    },
    {
        en: 'well up',
        description: 'Feel tears starting.'
    },
    {
        en: 'well up',
        description: 'Feel an emotion strongly.'
    },
    {
        en: 'well up',
        description: 'Experience an emotion or feeling, start to cry.'
    },
    {
        en: 'wheel around',
        description: 'Turn quickly and face in the opposite direction.'
    },
    {
        en: 'wheel out',
        description: 'Use something like an explanation that has been used many times before and has lost its impact.'
    },
    {
        en: 'wheel round',
        description: 'Turn quickly and face in the opposite direction.'
    },
    {
        en: 'while away',
        description: 'Spend time doing something because you have nothing better to do.'
    },
    {
        en: 'whip into',
        description: 'Enter rapidly (as for a brief errand).'
    },
    {
        en: 'whip out',
        description: 'Remove quickly.'
    },
    {
        en: 'whip out of',
        description: 'Exit rapidly.'
    },
    {
        en: 'whip through',
        description: 'Do something quickly.'
    },
    {
        en: 'whip up',
        description: 'Make food quickly.'
    },
    {
        en: 'whip up',
        description: 'Mix liquid food quickly to make it thick and creamy.'
    },
    {
        en: 'whip up',
        description: 'Make people feel more strongly about something.'
    },
    {
        en: 'whisk away',
        description: 'Take to another place quickly.'
    },
    {
        en: 'white out',
        description: 'Use correction fluid to cover a mistake in a written text.'
    },
    {
        en: 'wig out',
        description: 'Become excited and lose control.'
    },
    {
        en: 'wiggle out',
        description: 'Avoid doing.'
    },
    {
        en: 'wiggle out of',
        description: 'Avoid doing something.'
    },
    {
        en: 'wimp out',
        description: 'Not be brave enough to do something.'
    },
    {
        en: 'wind down',
        description: 'Relax.'
    },
    {
        en: 'wind down',
        description: 'Slowly close a business or organisation.'
    },
    {
        en: 'wind on',
        description: 'Forward a film or tape to a certain point.'
    },
    {
        en: 'wind up',
        description: 'Close a company because it\'s unprofitable.'
    },
    {
        en: 'wind up',
        description: 'Tighten the spring in a watch or clock to make it work.'
    },
    {
        en: 'wind up',
        description: 'Irritate someone or increase their stress level, especially if done deliberately.'
    },
    {
        en: 'winkle out',
        description: 'Find or get something that takes a great deal of effort.'
    },
    {
        en: 'wipe out',
        description: 'Make someone very tired.'
    },
    {
        en: 'wipe out',
        description: 'Kill all of a population, make extinct.'
    },
    {
        en: 'wire up',
        description: 'Make electrical connections.'
    },
    {
        en: 'wise up',
        description: 'Stop being stupid.'
    },
    {
        en: 'word up',
        description: 'Give someone information, advice.'
    },
    {
        en: 'word up!',
        description: 'A phrase that was used a greeting.'
    },
    {
        en: 'work off',
        description: 'Exercise to remove stress or weight.'
    },
    {
        en: 'work on',
        description: 'Improve or develop.'
    },
    {
        en: 'work out',
        description: 'End nicely.'
    },
    {
        en: 'work out',
        description: 'Find the answer or solution.'
    },
    {
        en: 'work over',
        description: 'Assault, beat up.'
    },
    {
        en: 'work over',
        description: 'Repeat, do again.'
    },
    {
        en: 'work over',
        description: 'Examine carefully.'
    },
    {
        en: 'work through',
        description: 'Deal with, resolve a problem, often emotional.'
    },
    {
        en: 'wrap around',
        description: 'Cover with clothing, usually to keep warm.'
    },
    {
        en: 'wrap around',
        description: 'Cover or encircle with part of your body.'
    },
    {
        en: 'wrap round',
        description: 'Cover with clothing, usually to keep warm.'
    },
    {
        en: 'wrap round',
        description: 'Cover or encircle with part of your body.'
    },
    {
        en: 'wrap up',
        description: 'Cover in paper.'
    },
    {
        en: 'wrap up',
        description: 'Dress warmly.'
    },
    {
        en: 'wrap up',
        description: 'Finish.'
    },
    {
        en: 'wriggle out of',
        description: 'Avoid doing something in a way other people don\'t like.'
    },
    {
        en: 'write down',
        description: 'Make notes.'
    },
    {
        en: 'write in',
        description: 'Send a letter to a TV station, etc..'
    },
    {
        en: 'write off',
        description: 'Destroy a car in an accident.'
    },
    {
        en: 'write out',
        description: 'Write something completely.'
    },
    {
        en: 'write up',
        description: 'Make complete written version.'
    },
    {
        en: 'yack on',
        description: 'Talk continuously, especially if it is an annoying way.'
    },
    {
        en: 'yammer on',
        description: 'Talk continuously, especially if it is an annoying way.'
    },
    {
        en: 'yield to',
        description: 'Surrender.'
    },
    {
        en: 'zero in on',
        description: 'Direct or focus attention on.'
    },
    {
        en: 'zero in on',
        description: 'Head for, move towards.'
    },
    {
        en: 'zero out',
        description: 'Cut off funding for a project.'
    },
    {
        en: 'zero out',
        description: 'Reduce to zero, cancel, remove.'
    },
    {
        en: 'zip around',
        description: 'Move quickly.'
    },
    {
        en: 'zip by',
        description: 'Pass quickly.'
    },
    {
        en: 'zip it',
        description: 'Keep quiet, say nothing.'
    },
    {
        en: 'zip up',
        description: 'Keep quiet.'
    },
    {
        en: 'zone in',
        description: 'Pay attention after not doing so.'
    },
    {
        en: 'zone in on',
        description: 'Pay attention after not doing so.'
    },
    {
        en: 'zone out',
        description: 'Not pay attention.'
    },
    {
        en: 'zone out',
        description: 'Dissociate yourself from a situation.'
    },
    {
        en: 'zonk out',
        description: 'Fall asleep.'
    },
    {
        en: 'zoom in',
        description: 'Focus more closely.'
    },
    {
        en: 'zoom in on',
        description: 'Focus more closely.'
    },
    {
        en: 'zoom off',
        description: 'Go somewhere quickly.'
    },
    {
        en: 'zoom out',
        description: 'Focus less closely.'
    }
];

/*
var phrasals = {};
a.forEach(function(o){
    var oa = o.en.split(' ');
    var verb = oa[0];
    var IN = oa.slice(1).join(' ').replace('!','').trim();
    if (!phrasals.hasOwnProperty(IN)) phrasals[IN] = [];
    if (phrasals[IN].indexOf(verb)<0) {
        phrasals[IN].push(verb);
    }
});

console.log(JSON.stringify(phrasals));
*/

var resultJSON = '{"by":["abide","check","come","drive","drop","fly","get","go","live","pass","put","roll","scrape","sit","slip","stand","stick","stop","swear","swing","tick","zip"],"for":["account","ache","allow","angle","answer","ask","bargain","call","care","cater","count","cover","die","enter","fall","fend","file","fish","front","gag","go","gun","hanker","head","hit","live","look","make","opt","pass","pay","pitch","plump","press","pull","root","run","send","settle","shoot","sign","sit","spoil","spring","stand","tap","toss","touch","try"],"on":["act","add","bang","bank","bargain","be","bear","border","bring","call","carry","catch","cheat","cheer","chew","cling","close","come","cotton","count","crack","dawn","decide","drag","draw","drone","dump","dwell","egg","embark","fasten","fawn","feed","figure","fink","focus","follow","frown","get","go","grass","grind","grow","hand","hang","harp","hate","have","hinge","hit","hold","jam","jump","keep","key","latch","lay","lead","lean","leap","leave","let","live","log","look","move","operate","pass","pick","pile","pin","play","plough","plow","prattle","press","prey","pull","put","quit","ramble","rat","reckon","ride","roll","run","save","sell","set","settle","sign","sit","sleep","slip","snitch","soldier","sponge","spring","spur","start","stay","stomp","strike","tack","tag","take","tell","throw","touch","trade","try","turn","urge","wait","walk","wave","weigh","wind","work","yack","yammer"],"out":["act","argue","ask","back","bag","bail","bang","bash","bawl","be","bear","beat","bed","belt","black","blank","blare","bleed","bliss","block","blow","blurt","board","book","bottle","bottom","bowl","branch","break","bring","bug","bulk","bundle","burn","butt","buy","call","cancel","carry","carve","cash","cast","catch","chalk","check","chew","chicken","chill","choke","chuck","churn","clean","clear","close","come","conk","contract","cop","count","crank","crash","creep","cross","cry","cut","die","dig","dine","dip","dish","divvy","dole","draw","drive","drop","drown","drum","dry","eat","edge","eke","empty","fall","farm","fathom","ferret","figure","fill","filter","find","fink","fish","fit","fizzle","flake","flame","flare","flesh","flip","flounce","fluff","freak","freeze","front","geek","get","give","go","grey","grind","grow","hammer","hand","hang","head","hear","help","hide","hold","hound","hunt","iron","keep","kick","knock","lash","lay","leak","leave","let","level","light","live","lock","log","look","lose","luck","make","mark","marry","max","measure","mete","miss","move","muscle","nerd","nip","nose","nut","opt","pack","pad","pan","pass","peel","peg","peter","phase","pick","pig","pile","pit","plant","play","plead","point","poop","pop","print","psych","pull","put","quarrel","rack","rain","rap","rat","reach","read","reason","reel","rent","ride","ring","roll","root","rub","rule","rush","sally","scout","screen","see","sell","send","set","shake","shell","ship","shoot","short","shout","show","shut","sign","sing","single","sit","slip","smoke","sneak","sniff","snuff","sort","sound","speak","spell","spew","spill","spin","spit","splash","stamp","stand","start","stay","steal","step","stick","stop","storm","straighten","strike","string","stub","suss","take","talk","tap","tear","text","throw","time","tire","top","trip","trot","try","tune","turn","type","veg","wait","walk","want","wash","watch","wear","weed","weigh","weird","wheel","whip","white","wig","wiggle","wimp","winkle","wipe","work","write","zero","zone","zonk","zoom"],"up":["act","add","back","bail","ball","balls","bang","bash","be","bear","beat","beef","belt","big","bitch","block","blow","board","boil","bolster","bone","book","boot","botch","bottle","box","brace","break","brick","brighten","bring","brush","buck","buckle","budge","buff","build","bulk","bump","bundle","buoy","burn","bust","butter","buy","call","carve","cash","cast","catch","chalk","charge","chase","chat","cheer","chew","choke","choose","chop","chuck","clag","clam","clean","clear","clog","close","cock","(color","come","conjure","coop","cost","cough","count","cover","cozy","crack","crank","crop","cross","cut","dig","dish","divide","divvy","do","double","draw","dream","dredge","dress","drink","drive","drum","dry","duff","ease","eat","edge","end","eye","fasten","fatten","feed","feel","fess","fill","finish","fire","firm","fit","fix","flag","flame","flare","fluff","fold","follow","free","freeze","freshen","front","fuel","gang","gear","get","gin","ginger","give","go","goof","grass","grind","grow","gussy","hack","ham","hang","have","head","heat","hit","hold","hole","hook","hunt","hush","jack","jazz","juice","keep","key","kick","knock","lap","light","lighten","limber","line","link","listen","load","lock","look","loosen","make","man","mark","mash","measure","mess","mix","mock","mop","mount","move","muddle","mug","open","own","pack","pair","pal","pass","patch","pep","perk","pick","pile","pin","pipe","plate","play","plough","plow","pluck","plump","polish","pony","pop","power","price","prop","psych","pucker","pull","put","queer","rack","rake","ramp","ratchet","ride","ring","roll","root","rough","run","rustle","saddle","save","saw","scale","scout","scrape","screw","sell","send","set","settle","sex","shack","shake","shape","shoot","show","shut","sign","sing","size","skin","slice","slip","slow","smash","snaffle","snap","snarl","sober","soften","spark","speak","spew","split","spring","spruce","square","squeeze","stack","staff","stand","start","stay","steal","step","stick","stiffen","stir","stitch","stop","straighten","strike","string","stuff","stump","suck","suit","sum","summon","take","talk","tap","team","tear","tee","think","throw","tidy","tie","tighten","tool","top","toss","touch","trade","train","trip","trump","tuck","tune","turn","type","use","vacuum","vamp","wait","wake","walk","warm","wash","weigh","well","whip","wind","wire","wise","word","wrap","write","zip"],"upon":["act","chance","come","count","decide","dwell","embark","grow","hinge","hit","leap","play","press","prey","set","strike","stumble","touch","trade","urge","wait"],"up to":["add","be","chalk","cozy","face","feel","fess","get","give","go","hook","kiss","live","look","make","measure","play","put","sidle","square","stand","suck"],"with":["agree","bear","belong","charge","disagree","do","finish","fool","go","hang","hit","hold","land","lie","live","make","meet","mess","part","play","quarrel","ring","run","saddle","side","sign","sit","square","stick","tag","toy"],"at":["aim","catch","fly","get","gnaw","go","grasp","jump","keep","leap","nag","peck","pick","play","pluck","sniff","stick","swing","talk","tear","toy"],"of":["allow","dream","give","hear","make","smack","tire"],"back":["answer","bounce","bring","call","claw","come","cut","die","double","draw","drive","drop","fall","fight","get","give","go","grow","hand","hang","hit","hold","keep","kick","knock","look","pare","pass","pay","play","plough","plow","pull","put","ring","roll","row","scale","send","set","shoot","sit","spring","stand","step","stop","strike","tail","take","talk","tie","toss","try"],"down":["argue","back","bargain","be","beat","bed","bend","blow","bog","boil","break","bring","bucket","buckle","burn","calm","chase","chop","chow","climb","close","come","cool","count","crumb","cut","damp","dash","die","doss","draw","dress","drill","dumb","fall","fasten","flag","get","go","grind","hand","hold","hose","hunker","hunt","jot","keep","key","kick","kip","knock","knuckle","lash","lay","let","lie","live","load","lock","man","mark","melt","move","nail","narrow","note","pad","pare","pass","pat","pay","peg","pin","pipe","play","plump","pour","power","pull","put","quieten","rub","run","scale","settle","shake","shout","shut","simmer","sit","slip","slow","smash","splash","sponge","stand","stare","step","stick","strike","swear","take","talk","tear","tie","tone","toss","touch","track","trade","trickle","turn","wash","water","wave","wear","wind","write"],"about":["ask","bang","bash","boss","bring","clown","come","doss","faff","fall","fart","fiddle","fly","fool","gad","get","go","hang","hear","kick","knock","lark","mess","mooch","mope","nose","pal","poke","potter","root","scout","see","set","sit","slob","stand","swan","toss","wait"],"after":["ask","be","call","get","go","hanker","look","lust","make","name","run","take"],"around":["ask","bang","boss","bring","buzz","call","clown","come","doss","drop","faff","fart","fiddle","fly","fool","gad","get","go","goof","hack","hang","have","hoon","horse","hover","jack","jerk","joke","keep","kick","knock","lark","lie","mess","mill","monkey","mooch","mope","nose","pal","pass","play","poke","potter","root","run","scout","screw","shop","show","sit","slob","sniff","stand","stick","stop","swan","swing","talk","toss","wait","wheel","wrap","zip"],"in":["ask","barge","bash","be","block","blow","bog","book","box","break","breeze","brick","bring","butt","buy","call","cash","cave","check","chime","chip","chuck","close","come","contract","count","creep","cut","dig","dip","dive","do","dob","draw","drop","drown","eat","end","fall","fence","fill","filter","fit","get","give","go","hand","have","jack","jump","keep","key","kick","land","let","live","lock","log","look","marry","move","muscle","opt","pack","pencil","phase","pile","pitch","plug","pop","price","pull","push","put","rake","reel","rein","ring","roll","romp","room","rope","rub","run","scrape","send","set","settle","shade","show","shut","sign","sink","sit","sleep","slip","smash","stave","stay","step","stop","suck","swan","take","throw","tie","trade","tuck","tune","turn","type","usher","wade","wait","weigh","write","zone","zoom"],"over":["ask","bend","blow","boil","bowl","bubble","carry","change","check","chew","cloud","come","creep","double","drop","fall","fawn","flick","freeze","get","give","gloss","go","hand","hang","have","hold","keel","look","make","mess","mull","paper","pass","pore","pull","put","rake","run","screw","show","sit","sleep","spill","start","stay","steal","stop","take","talk","think","throw","tick","tide","tip","toy","trip","turn","wash","watch","work"],"round":["ask","bring","call","come","drop","get","go","have","look","pass","ring","scout","show","swing","talk","wheel","wrap"],"off":["auction","back","be","blast","block","blow","bog","bounce","break","bring","brush","bug","bump","bundle","bunk","burn","buy","buzz","call","cap","carry","cart","cast","chase","check","chew","choke","clean","clear","close","come","cool","cop","count","cream","cross","cry","cut","damp","dash","die","doze","drift","drive","drop","dry","ease","face","fall","feed","fence","fend","fight","finish","fire","flip","flog","flounce","fob","frighten","front","get","give","go","goof","hack","have","head","hive","hold","jerk","jump","keep","kick","kill","kiss","knock","laugh","lay","let","level","lift","live","log","make","mark","measure","mouth","naff","nip","nod","pack","pair","palm","pass","pay","peel","pick","pig","play","polish","pop","power","pull","put","race","rack","rain","rake","rattle","read","reel","ride","ring","rip","rope","round","run","rush","sag","saw","scare","screen","see","sell","send","set","shake","shave","ship","shoot","show","shrug","shut","sign","skive","slack","slacken","slag","sleep","slice","slip","slope","slough","snap","sound","spark","spin","spirit","sponge","square","start","stave","stomp","stop","storm","strike","swan","syphon","tail","take","tear","tee","tell","throw","tick","tip","toddle","tootle","top","toss","touch","trade","trot","turn","walk","wander","wave","wean","wear","work","write","zoom"],"away":["back","be","beaver","blaze","blow","bottle","break","carried","chuck","clear","die","drive","drop","eat","ebb","fiddle","file","fire","frighten","get","ghost","give","go","grind","hide","jabber","jaw","keep","lock","magic","move","pack","pass","peel","peg","pine","play","pull","put","run","rush","salt","scare","shoot","shut","sign","slip","spaff","spirit","square","stash","stay","steal","stow","tail","take","tear","throw","tick","tow","tuck","turn","wash","waste","wear","while","whisk"],"into":["back","barge","bog","book","bounce","breeze","bump","burst","buy","check","come","creep","dig","dip","dive","draw","drill","drum","eat","enter","fall","fit","fly","get","go","grind","grow","hack","hammer","hook","lash","lay","log","look","luck","make","move","muscle","opt","pay","pile","pitch","plough","plow","press","rope","run","rush","sail","scrape","see","sign","slip","suck","talk","tap","tear","tuck","turn","wade","walk","whip"],"out of":["back","bail","be","break","cheat","check","come","contract","do","duck","get","grow","run","shut","sign","snap","talk","whip","wiggle","wriggle"],"out on":["bail","creep","cut","dine","hold","lash","lose","miss","poop","splash","walk"],"on about":["bang","be","go"],"along":["be","breeze","bring","coast","come","get","move","muddle","play","pootle","rub","run","scrape","sing","string","tag","tick"],"cut out for":["be"],"cut up":["be"],"down on":["be","bear","chow","clamp","come","crack","cut","get","go","kip","look","rain","weigh"],"down with":["be","come","go"],"fed up":["be"],"in on":["be","cash","close","fill","get","home","hone","key","look","move","muscle","sit","walk","weigh","zero","zone","zoom"],"not on":["be"],"onto":["be","fasten","front","get","give","hang","hold","latch","lock","tack","tag"],"out to":["be","go","lose","reach","start"],"snowed under":["be"],"taken aback":["be"],"taken with":["be"],"up for":["be","limber","make","stand","stick"],"up under":["bear"],"away at":["beaver","chip","gnaw","hammer"],"to":["belong","cater","cling","come","gear","get","go","grow","keep","key","lead","look","occur","owe","pass","pull","run","see","set","step","stick","take","turn","yield"],"over backwards":["bend"],"down to":["boil","get","go","put","talk"],"up on":["bone","buff","catch","creep","gang","give","grow","hang","hit","load","mug","pick","read","rub","run","sneak","steal"],"out in":["break","bring","come"],"through":["break","breeze","carry","click","come","cruise","drop","fall","flick","flip","follow","get","go","live","look","muddle","nod","pass","pick","plough","plow","pull","put","rat","romp","run","sail","scrape","see","show","sift","sit","sleep","sweep","take","talk","think","wade","walk","waltz","whip","work"],"forth":["bring","call","come","go","hold","issue","pour","sally","set","venture"],"forward":["bring","carry","go","step"],"under":["buckle","fall","go","knuckle"],"on with":["carry","get","go","sign"],"about for":["cast"],"around for":["cast"],"aside":["cast","set","stand","step","take","wave"],"round for":["cast"],"up in":["catch","land"],"up with":["catch","come","end","finish","keep","link","put"],"on to":["cling","get","go","hold","latch","pass"],"in upon":["close"],"together":["cobble","get","go","grow","hang","hold","knock","live","patch","pull","scrape","stick","string","throw"],"across":["come","cut","get","go","put","run","stumble"],"apart":["come","drift","fall","grow","pull","set","take","tear","tell"],"around to":["come","get"],"before":["come","go"],"down upon":["come"],"forth with":["come"],"from":["come","grow","hear","keep","spring","stem"],"in for":["come","fill","go","put","sit","stand"],"into use":["come"],"off it":["come","get"],"out with":["come","fit","go"],"through with":["come","go"],"up against":["come","gang","rub","run","stack"],"it":["cop","floor","get","go","make","peg","take","zip"],"do with":["could","make"],"against":["count","go","have","hold","measure","pit","run","turn"],"among":["count"],"towards":["count","gear","go","make","move","put"],"back on":["cut","fall","go"],"it out":["cut","fight","slug","spit"],"away with":["do","get","make","walk"],"without":["do","go"],"as":["double","pass"],"up as":["double"],"even":["draw"],"down through":["drill"],"someone in it":["drop"],"behind":["fall","get","stop","wait"],"in with":["fit","get","go","tie"],"off on":["fob","get","rub","sign","start","tee"],"off onto":["fob"],"off with":["fob","get","go","make","pair","tap","walk"],"on from":["follow"],"ahead":["forge","get","go","move","press","pull"],"above":["get"],"across to":["get"],"ahead of":["get"],"along in":["get"],"along with":["get","go"],"away from":["get","grow","move","peel","shy","stay","walk"],"back at":["get"],"back into":["get"],"back to":["get"],"back together":["get"],"behind with":["get"],"by on":["get"],"by with":["get"],"it off":["get","have","hit","knock"],"it off with":["get","hit"],"it on":["get","try"],"it on with":["get"],"it together":["get"],"it up":["get","hang","large","lark","live"],"on at":["get","go","start"],"on for":["get"],"over with":["get"],"round (around) to":["get"],"round (or around)":["get"],"through to":["get"],"in to":["give","tune"],"it to":["give","stick"],"it up for":["give"],"it up to":["give","make"],"over to":["give","go"],"way":["give"],"way to":["give"],"yourself up":["give","pick"],"yourself up to":["give"],"ahead with":["go"],"below":["go"],"for it":["go"],"it alone":["go"],"one":["go"],"out for":["go","hang","hold","listen","look","mark","reach","send","stick","try","watch"],"past":["go"],"back from":["hang","hold","walk"],"in there":["hang"],"down as":["have","mark"],"it away":["have"],"it in for":["have"],"it out with":["have"],"out at":["hit","lash","leap"],"out against":["hold","lash"],"up at":["keep"],"around with":["kick","mess"],"yourself away":["lock","shut"],"forward to":["look"],"on as":["look"],"upon as":["look"],"it over":["lord"],"out from":["mark"],"about with":["mess"],"it in":["pack","rake","rub"],"off from":["peel"],"up after":["pick"],"yourself down":["plump"],"forward with":["press"],"yourself together":["pull"],"down for":["put"],"off for":["send"],"toward":["slant"],"off to":["slip","trot"],"to it":["snap"],"off against":["square"],"out as":["start"],"clear of":["steer"],"on it":["step"],"it out on":["take"],"it upon yourself":["take"],"yourself out":["talk"],"yourself at":["throw"],"yourself into":["throw"]}'
